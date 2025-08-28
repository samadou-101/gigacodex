import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { testDatabaseConnection } from "./config/db.config.js";
import { redisConnection } from "./config/redis.config.js";

const PORT = process.env.PORT || 4000;

async function startServer() {
  const dbConnected = await testDatabaseConnection();

  if (!dbConnected) {
    console.error(" Cannot start server without database connection");
    process.exit(1);
  }

  await redisConnection();

  app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("❌ Failed to start server:", error);
  process.exit(1);
});
