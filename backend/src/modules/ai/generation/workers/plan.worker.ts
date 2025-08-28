import { redis } from "@/config/redis.config.js";
import { Worker } from "bullmq";

const planWorker = new Worker(
  "planQueue",
  async (job) => {
    console.log(job);
  },
  { connection: redis }
);

planWorker.on("completed", () => console.log("plan worker done"));
