import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";

// Database configuration for localhost PostgreSQL
const DATABASE_URL = process.env.DATABASE_URL;
// ||
// "postgresql://postgres:mossabdo2002@localhost:5432/gigacodex_dev";

// Create Prisma client with connection logging
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: [
    { emit: "event", level: "query" },
    { emit: "stdout", level: "error" },
    { emit: "stdout", level: "info" },
    { emit: "stdout", level: "warn" },
  ],
});

// Test database connection
export async function testDatabaseConnection() {
  console.log(process.env.DATABASE_URL);
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully to:", DATABASE_URL);
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    console.log("Please check your PostgreSQL connection:");
    console.log("1. Make sure PostgreSQL is running on localhost:5432");
    console.log("2. Create database: CREATE DATABASE gigacodex_db;");
    console.log("3. Update DATABASE_URL in your .env file if needed");
    return false;
  }
}

// Log database queries in development
if (process.env.NODE_ENV === "development") {
  prisma.$on("query", (e) => {
    console.log("📊 Query:", e.query);
    console.log("📝 Params:", e.params);
    console.log("⏱️  Duration:", e.duration + "ms");
  });
}

export default prisma;
