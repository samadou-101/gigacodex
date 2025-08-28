export const runWorkers = async () => {
  await import("./plan.worker.js");
};
