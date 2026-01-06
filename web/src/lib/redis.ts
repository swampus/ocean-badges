import Redis from "ioredis";

/**
 * Redis connection URL for Docker / local.
 *
 * Supports:
 *   REDIS_URL=redis://redis:6379
 * or
 *   REDIS_HOST=redis
 *   REDIS_PORT=6379
 */
const redisUrl =
  process.env.REDIS_URL ??
  `redis://${process.env.REDIS_HOST ?? "redis"}:${process.env.REDIS_PORT ?? "6379"}`;

/**
 * Singleton Redis client.
 */
const redisClient = new Redis(redisUrl, {
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
});

/**
 * Direct access (for simple use cases).
 */
export const redis = redisClient;

/**
 * Helper accessor (for legacy / explicit usage).
 */
export function getRedis(): Redis {
  return redisClient;
}
