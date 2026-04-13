import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Rate limit generation based on IP/User ID
const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

export const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 requests per 10 seconds
      analytics: true,
      prefix: "changelog-ai-ratelimit",
    })
  : null;

export async function checkRateLimit(id: string) {
  if (!ratelimit) return { success: true };
  return await ratelimit.limit(id);
}
