import { redis } from "@/config/redis.config.js";
import { Worker } from "bullmq";
import { ai } from "@/config/ai.config.js";

const planWorker = new Worker(
  "planQueue",
  async (job) => {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "hello",
    });
    // console.log(job.data);
    console.log(response.text);
  },
  { connection: redis }
);

planWorker.on("completed", () => console.log("plan worker done"));
