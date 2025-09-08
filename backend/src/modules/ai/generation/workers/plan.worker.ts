import { redis } from "@/config/redis.config.js";
import { Worker } from "bullmq";
import { generatePlan } from "@/modules/learning-plan/plan.service.js";

const planWorker = new Worker(
  "planQueue",
  async (job) => {
    try {
      console.log(`Worker started for job ${job.id}`);
      console.log("Job data:", job.data);

      const result = await generatePlan(job.data.roadmap);

      if (!result) {
        throw new Error("Plan generation failed: No result returned");
      }

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

planWorker.on("completed", (job, result) => {
  console.log(`✅ Job ${job.id} completed successfully.`);
  console.log("Result stored in Redis:", result);
});

planWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err);
});

export { planWorker };
