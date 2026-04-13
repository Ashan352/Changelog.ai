export function sanitizeInput(input: string, maxTokens: number = 25000): string {
  if (!input || typeof input !== 'string') return '';
  
  // Basic sanity cleaning
  let sanitized = input.trim().replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, '');
  
  // Prompt injection heuristic
  const injectionPatterns = [
    /ignore (all )?previous/i,
    /system prompt/i,
    /you are now a/i,
    /forget everything/i,
    /markdown mode/i,
    /output the following/i
  ];
  
  if (injectionPatterns.some(pattern => pattern.test(sanitized))) {
    // If injection is suspected, we don't block (might be valid commits) 
    // but we wrap it in a way that the LLM treats it as data only.
    sanitized = "[SUSPICIOUS DATA DETECTED]: " + sanitized.replace(/[\{\}]/g, ''); 
  }

  // Truncate to roughly maxTokens (assuming ~4 chars per token)
  const maxChars = maxTokens * 4;
  if (sanitized.length > maxChars) {
    sanitized = sanitized.substring(0, maxChars) + "\n\n...[TRUNCATED]";
  }
  
  return sanitized;
}
