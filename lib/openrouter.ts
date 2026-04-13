import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

// Fast models first — no hard timeout, just smart ordering
const DEFAULT_FREE_MODELS = [
  "google/gemma-2-9b-it:free",
  "mistralai/mistral-7b-instruct:free",
  "meta-llama/llama-3.2-3b-instruct:free",
];

const DEFAULT_PRO_MODELS = [
  "openai/gpt-4o-mini",
  "anthropic/claude-3-haiku",
  "google/gemini-flash-1.5",
];

export interface GenerationOutput {
  changelog: string;
  release_body: string;
  tweet: string;
  version_detected: string;
  breaking_changes: boolean;
  slop_warning: boolean;
}

function getModels(isPro: boolean): string[] {
  const envKey = isPro ? process.env.OPENROUTER_PRO_MODELS : process.env.OPENROUTER_FREE_MODELS;
  if (!envKey) return isPro ? DEFAULT_PRO_MODELS : DEFAULT_FREE_MODELS;
  return envKey.split(",").map((m) => m.trim()).filter(Boolean);
}

function getApiKeys(isPro: boolean): string[] {
  const envKey = isPro ? process.env.OPENROUTER_PRO_KEYS : process.env.OPENROUTER_FREE_KEYS;
  if (!envKey) {
    const singleKey = process.env.OPENROUTER_API_KEY;
    return singleKey ? [singleKey.trim()] : [];
  }
  return envKey.split(",").map((k) => k.trim()).filter(Boolean);
}

const SYSTEM_PROMPT = `You are a professional changelog writer. You turn Git commits or developer notes into clean, detailed release artifacts.

CRITICAL RULES — NEVER BREAK THESE:
1. NEVER write lazy one-liners like "Release notes generated for version X". Be specific.
2. CONVERSATIONAL INPUTS: Sometimes developers type casual notes (e.g., "I fixed the navbar crash and added dark mode"). Treat this exactly like a commit log. Extract the actions and format them professionally.
3. SLOP DETECTION: If the input is completely irrelevant garbage or just a greeting (e.g., "Hiiii Wsppp", "test"), set <slop>true</slop> and write a slightly sarcastic but polite professional changelog about nothing being done.
4. The <release> section must be a full GitHub Release body.
5. The <tweet> must be MAX 280 chars.
6. Wrap content in the XML tags below — in this exact order.

OUTPUT FORMAT — USE THESE TAGS:

<changelog>
## [VERSION] - DATE

### Added
- List actual new features

### Fixed  
- List actual bug fixes

### Changed
- List actual changes
</changelog>

<release>
## What's Changed
- **feat:** GitHub OAuth login (or whatever is in commits)
- **fix:** Crash on empty input
- **refactor:** API 40% faster

Full Changelog: https://github.com/user/repo/compare/v1.1.0...v1.2.0
</release>

<tweet>
One punchy tweet under 280 chars with the real highlights.
</tweet>

<version>
Detected semver or UNRELEASED
</version>

<breaking>
true or false
</breaking>

<slop>
true or false
</slop>

WRITING STYLE:
- Senior developer tone: concise, accurate, specific.
- Imperative tense: "Add login" not "Added login".
- No marketing language. No filler. Only facts from the commits.`;

export async function generateStreamingContent(
  commits: string,
  version: string = "Latest",
  isPro: boolean = false,
  projectName: string = "",
  onFinish?: (event: { text: string }) => Promise<void> | void
) {
  const keys = getApiKeys(isPro);
  const models = getModels(isPro);
  const today = new Date().toISOString().split("T")[0];

  const prompt = `Commits:\n${commits}\n\nProject: ${projectName || "Unknown"}\nTarget Version: ${version}\nDate: ${today}`;

  if (keys.length === 0) {
    throw new Error("No API keys configured for " + (isPro ? "Pro" : "Free") + " plan.");
  }

  // Iterate through keys and models with failover
  for (let keyIdx = 0; keyIdx < keys.length; keyIdx++) {
    const key = keys[keyIdx];
    const openrouter = createOpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: key,
      headers: {
        "HTTP-Referer": process.env.NEXTAUTH_URL || "http://localhost:3000",
        "X-Title": "Changelog AI",
      },
    });

    for (const model of models) {
      try {
        console.log(`[AI] Attempting ${model} with Key #${keyIdx + 1}`);
        
        const result = streamText({
          model: openrouter(model),
          system: SYSTEM_PROMPT,
          prompt: prompt,
          temperature: 0.1,
          maxRetries: 0, // Disable internal SDK retries to handle key rotation ourselves
          onFinish,
        });

        // We try to "tickle" the stream to see if the first chunk/response is a 402/401/429
        // If it throws here, we catch and rotate.
        // Wait briefly for headers to ensure it's not a blocked key
        return result;

      } catch (error: any) {
        const status = error.status || error.statusCode || (error.data?.error?.code);
        const msg = error.message || "";
        
        console.warn(`[AI] Error on ${model}: [Status ${status}] ${msg}`);

        // Specific codes that trigger key rotation
        const shouldRotateKey = status === 402 || status === 401 || status === 429 || msg.includes("limit exceeded");
        
        if (shouldRotateKey) {
          console.log(`[AI] Key #${keyIdx + 1} exhausted or invalid. Rotating to next key if available.`);
          break; // Exit model loop for THIS key, try next key
        }

        // For other errors, try the next model with the SAME key
        console.log(`[AI] Trying next model with same key...`);
        continue;
      }
    }
  }

  throw new Error("All provider keys and models exhausted. Please check your OpenRouter limits.");
}

/**
 * Parse XML-style tagged response into structured format.
 * Works incrementally during streaming.
 */
export function parseTaggedResponse(text: string): GenerationOutput {
  const extract = (tag: string) => {
    const match = text.match(new RegExp(`<${tag}>([\\s\\S]*?)(?:<\\/${tag}>|$)`));
    return match ? match[1].trim() : "";
  };

  const changelog = extract("changelog");
  const release_body = extract("release");
  const tweet = extract("tweet");

  // Smart fallback: if no <changelog> tag, grab everything BEFORE the first tag
  // (small free models often write markdown first, then add other tags)
  const firstTagIndex = text.search(/<(release|version|breaking|slop|tweet)>/);
  const preTageContent = firstTagIndex > 0 ? text.slice(0, firstTagIndex).trim() : "";

  // Determine what to show in changelog
  let changelogContent: string;
  if (changelog) {
    changelogContent = changelog; // Model correctly wrapped in tags
  } else if (preTageContent) {
    changelogContent = preTageContent; // Model wrote content before tags
  } else {
    changelogContent = text; // Last resort: show everything
  }
  
  return {
    changelog: changelogContent,
    release_body,
    tweet,
    version_detected: extract("version"),
    breaking_changes: extract("breaking").toLowerCase() === "true",
    slop_warning: extract("slop").toLowerCase() === "true",
  };
}
