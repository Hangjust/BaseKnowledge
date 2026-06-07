import { MongoServerError } from "mongodb";
import { hasMongoConfig } from "./env";
import { getDb } from "./mongodb";

const buckets = new Map<string, { count: number; resetAt: number }>();
let rateLimitIndexesPromise: Promise<void> | null = null;

async function rateLimitCollection() {
  const db = await getDb();
  const collection = db.collection<{
    _id: string;
    key: string;
    count: number;
    resetAt: Date;
  }>("rate_limits");

  if (!rateLimitIndexesPromise) {
    rateLimitIndexesPromise = collection.createIndex({ resetAt: 1 }, { expireAfterSeconds: 0 }).then(() => undefined);
  }

  await rateLimitIndexesPromise;
  return collection;
}

function checkMemoryRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (bucket.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: bucket.resetAt };
  }

  bucket.count += 1;
  return { allowed: true, remaining: limit - bucket.count };
}

export async function checkRateLimit(key: string, limit: number, windowMs: number) {
  if (!hasMongoConfig()) {
    return checkMemoryRateLimit(key, limit, windowMs);
  }

  const windowStart = Math.floor(Date.now() / windowMs) * windowMs;
  const resetAt = new Date(windowStart + windowMs);
  const collection = await rateLimitCollection();

  try {
    const result = await collection.findOneAndUpdate(
      { _id: `${key}:${windowStart}`, count: { $lt: limit } },
      {
        $inc: { count: 1 },
        $setOnInsert: {
          key,
          resetAt
        }
      },
      {
        upsert: true,
        returnDocument: "after"
      }
    );

    const count = result?.count ?? limit;
    return { allowed: count <= limit, remaining: Math.max(limit - count, 0), resetAt: resetAt.getTime() };
  } catch (caught) {
    if (caught instanceof MongoServerError && caught.code === 11000) {
      return { allowed: false, remaining: 0, resetAt: resetAt.getTime() };
    }

    throw caught;
  }
}
