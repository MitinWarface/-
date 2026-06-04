// Replacement for Redis with PostgreSQL cache
// Functions now use PostgreSQL for caching

export async function get<T>(key: string): Promise<T | null> {
  try {
    const response = await fetch(`/api/cache?key=${encodeURIComponent(key)}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.value ? JSON.parse(data.value) as T : null;
  } catch {
    return null;
  }
}

export async function setex(key: string, ttl: number, value: any): Promise<void> {
  try {
    await fetch('/api/cache', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value: JSON.stringify(value), ttl }),
    });
  } catch (err) {
    console.error('Cache set failed:', err);
  }
}

export async function del(key: string): Promise<void> {
  try {
    await fetch(`/api/cache?key=${encodeURIComponent(key)}`, { method: 'DELETE' });
  } catch (err) {
    console.error('Cache delete failed:', err);
  }
}

export const redis = null;