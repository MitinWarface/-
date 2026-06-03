import Redis from 'ioredis';

const UPSTASH_REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

let redisClient: Redis | null = null;

if (typeof window === 'undefined') {
  if (UPSTASH_REDIS_URL && UPSTASH_REDIS_TOKEN) {
    redisClient = new Redis(UPSTASH_REDIS_URL);
  } else if (process.env.REDIS_URL) {
    redisClient = new Redis(process.env.REDIS_URL);
  }
}

export const redis = redisClient;

export const getCached = async <T>(key: string): Promise<T | null> => {
  try {
    if (!redis) throw new Error('Redis not configured');
    const cached = await redis.get(key);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error('Redis cache error:', error);
    return null;
  }
};

export const setCached = async (key: string, data: any, ttl = 3600): Promise<void> => {
  try {
    if (!redis) throw new Error('Redis not configured');
    await redis.setex(key, ttl, JSON.stringify(data));
  } catch (error) {
    console.error('Redis cache set error:', error);
  }
};

export const invalidateCache = async (key: string): Promise<void> => {
  try {
    if (!redis) throw new Error('Redis not configured');
    await redis.del(key);
  } catch (error) {
    console.error('Redis cache invalidation error:', error);
  }
};

export const getServerStatsCacheKey = (serverId: string) => `server:${serverId}:stats`;
export const getServerLogsCacheKey = (serverId: string) => `server:${serverId}:logs`;
export const getServerActivityCacheKey = (serverId: string) => `server:${serverId}:activity`;