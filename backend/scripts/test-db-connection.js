#!/usr/bin/env node

import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

async function testDatabaseConnection() {
  const DIRECT_URL = process.env.DIRECT_URL;

  if (!DIRECT_URL) {
    console.error("❌ DIRECT_URL environment variable is not set");
    console.log("Please create a .env file with:");
    console.log(
      'DIRECT_URL="postgresql://username:password@localhost:5432/database_name"'
    );
    process.exit(1);
  }

  console.log("🔍 Testing database connection...");
  console.log(
    "📝 DIRECT_URL:",
    DIRECT_URL.replace(/\/\/[^:]+:[^@]+@/, "//***:***@")
  ); // Hide password

  // Parse DIRECT_URL
  let config;
  try {
    const parsed = new URL(DIRECT_URL);
    config = {
      host: parsed.hostname,
      port: parseInt(parsed.port) || 5432,
      database: parsed.pathname.slice(1),
      user: parsed.username,
      password: parsed.password,
      ssl: false,
    };
  } catch (error) {
    console.error("❌ Invalid DIRECT_URL format:", error.message);
    process.exit(1);
  }

  console.log("🔧 Connection config:", {
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password ? "***" : "undefined",
  });

  // Test connection
  const pool = new Pool(config);

  try {
    const client = await pool.connect();
    console.log("✅ Database connection successful!");

    // Test query
    const result = await client.query("SELECT NOW() as current_time");
    console.log("⏰ Current database time:", result.rows[0].current_time);

    // Test sessions table
    try {
      const sessionsResult = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'sessions'
        );
      `);

      if (sessionsResult.rows[0].exists) {
        console.log("✅ Sessions table exists");
      } else {
        console.log(
          "⚠️  Sessions table does not exist (will be created automatically)"
        );
      }
    } catch (error) {
      console.log("⚠️  Could not check sessions table:", error.message);
    }

    client.release();
    await pool.end();

    console.log("🎉 Database connection test completed successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    console.log("\n🔧 Troubleshooting tips:");
    console.log("1. Make sure PostgreSQL is running");
    console.log("2. Check your username and password");
    console.log("3. Verify the database exists");
    console.log("4. Check if the port is correct (default: 5432)");
    console.log("5. Ensure your user has proper permissions");

    process.exit(1);
  }
}

testDatabaseConnection();
