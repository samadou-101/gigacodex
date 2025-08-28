import { Redis } from "ioredis";

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) throw new Error("REDIS_URL is not defined");

const redis = new Redis(redisUrl);

const redisConnection = async () => {
  try {
    await redis.ping();
    console.log(" Redis server connected");
  } catch (err) {
    console.error("Redis connection failed", err);
    throw err;
  }
};

export { redisConnection, redis };
