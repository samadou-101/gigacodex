import { redis } from "@/config/redis.config.js";
import { Worker } from "bullmq";
import {
  generatePlan,
  savePlanToCache,
  savePlanToDB,
} from "@/modules/learning-plan/plan.service.js";

const planWorker = new Worker(
  "planQueue",
  async (job) => {
    try {
      console.log(`Worker started for job ${job.id}`);
      console.log("Job data:", job.data);
      const { data, userId } = job.data;
      const result = await generatePlan(data.roadmap);

      if (!result) {
        throw new Error("Plan generation failed: No result returned");
      }
      const parsedResult =
        typeof result === "string" ? JSON.parse(result) : result;

      const savedLearningPlan = await savePlanToDB(userId, parsedResult);
      if (!savedLearningPlan)
        throw new Error("error while saving plan to db from worker");

      await savePlanToCache(userId, parsedResult);
      // console.log(await redis.get(`learningPlan:${userId}`));

      console.log(`Plan generated for job ${job.id}`);
      return result;
    } catch (err) {
      console.error(`Worker error on job ${job.id}:`, err);
      throw err;
    }
  },
  {
    connection: redis,
  }
);

// planWorker.on("completed", (job, result) => {
//   console.log(`✅ Job ${job.id} completed successfully.`);
//   console.log("Result stored in Redis:", result);
// });

// planWorker.on("failed", (job, err) => {
//   console.error(`❌ Job ${job?.id} failed:`, err);
// });

export { planWorker };
