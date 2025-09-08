import { Queue } from "bullmq";
import { redis } from "@/config/redis.config.js";

const planQueue = new Queue("planQueue", {
  connection: redis,
  defaultJobOptions: {
    removeOnComplete: false,
    removeOnFail: false,
  },
});

export { planQueue };
