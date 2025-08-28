import { Queue } from "bullmq";

const planQueue = new Queue("planQueue");

export { planQueue };
