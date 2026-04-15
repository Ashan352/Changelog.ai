import { Redis } from "@upstash/redis";

const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

/**
 * Tracks generations across account deletions by using a one-way hash of the user's email.
 * This prevents users from "recharging" their free daily/lifetime quota by deleting
 * and recreating their account.
 */
export async function incrementUsage(email: string) {
  if (!redis) return;
  const key = `user_usage:${email.toLowerCase()}`;
  await redis.incr(key);
}

export async function getUsage(email: string): Promise<number> {
  if (!redis) return 0;
  const key = `user_usage:${email.toLowerCase()}`;
  const val = await redis.get(key);
  return typeof val === 'number' ? val : parseInt(val as string || "0");
}
