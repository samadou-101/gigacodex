import { createClient } from "redis";

const client = createClient({ url: process.env.REDIS_URL });

client.on("error", (err) => console.log("Redis Client Error", err));

const redisConnection = async () => {
  try {
    await client.connect();
    console.log("Reis Server Connected");
  } catch (error) {
    console.log("Redis Connection Failed", error);
  }
};

export { client, redisConnection };
