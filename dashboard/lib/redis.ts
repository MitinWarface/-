// Redis отключён в пользу PostgreSQL кеша.
// Файл оставлен для совместимости импортов, но не экспортирует функции.
export const redis = null;
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