import dotenv from "dotenv";
dotenv.config();
import session from "express-session";
import pgSimple from "connect-pg-simple";
import { Pool } from "pg";

// Parse DATABASE_URL to extract components
const parseDatabaseUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return {
      host: parsed.hostname,
      port: parseInt(parsed.port) || 5432,
      database: parsed.pathname.slice(1),
      user: parsed.username,
      password: parsed.password,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false,
    };
  } catch (error) {
    console.error("❌ Invalid DATABASE_URL format:", error);
    throw new Error("Invalid DATABASE_URL format");
  }
};

// Create PostgreSQL connection pool for session store
const createPool = () => {
  const DATABASE_URL = process.env.DATABASE_URL;

  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is required");
  }

  console.log("🔗 Connecting to PostgreSQL for session storage...");

  try {
    const config = parseDatabaseUrl(DATABASE_URL);

    return new Pool({
      ...config,
      max: 20, // Maximum number of clients in the pool
      idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
      connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
    });
  } catch (error) {
    console.error("❌ Failed to create database pool:", error);
    throw error;
  }
};

const pool = createPool();

// Test pool connection
pool.on("connect", () => {
  console.log("✅ PostgreSQL session pool connected");
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL session pool error:", err);
});

// Create session store using PostgreSQL
const PostgresStore = pgSimple(session);

// Session store configuration
const sessionStore = new PostgresStore({
  pool,
  tableName: "sessions", // Table name for storing sessions
  createTableIfMissing: true, // Automatically create sessions table
  pruneSessionInterval: 60, // Clean up expired sessions every 60 seconds
});

// Session configuration
export const sessionConfig = {
  store: sessionStore,
  secret: process.env.SESSION_SECRET || "your-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: "lax" as const,
  },
  name: "sid", // Session cookie name
};

// Clean up expired sessions (optional)
export const cleanupExpiredSessions = async () => {
  try {
    const result = await pool.query(
      "DELETE FROM sessions WHERE expire < NOW()"
    );
    if (result.rowCount && result.rowCount > 0) {
      console.log(`🧹 Cleaned up ${result.rowCount} expired sessions`);
    }
  } catch (error) {
    console.error("❌ Failed to cleanup expired sessions:", error);
  }
};

// Run cleanup every hour
setInterval(cleanupExpiredSessions, 60 * 60 * 1000);

export default sessionConfig;
