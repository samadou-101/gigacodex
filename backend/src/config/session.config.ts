import dotenv from "dotenv";
dotenv.config();
import session from "express-session";
import pgSimple from "connect-pg-simple";
import { Pool } from "pg";

// Parse DIRECT_URL to extract components
const parseDatabaseUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return {
      host: parsed.hostname,
      port: parseInt(parsed.port) || 5432,
      database: parsed.pathname.slice(1),
      user: parsed.username,
      password: parsed.password,
      ssl: { require: true, rejectUnauthorized: false },
      prepare: false,
    };
  } catch (error) {
    console.error("❌ Invalid DIRECT_URL format:", error);
    throw new Error("Invalid DIRECT_URL format");
  }
};

// Create PostgreSQL connection pool for session store
const createPool = () => {
  const DIRECT_URL = process.env.DIRECT_URL;

  if (!DIRECT_URL) {
    throw new Error("DIRECT_URL environment variable is required");
  }

  console.log("🔗 Connecting to PostgreSQL for session storage...", DIRECT_URL);

  try {
    const config = parseDatabaseUrl(DIRECT_URL);
    console.log("Parsed Config:", config); // Debug parsed config

    return new Pool({
      ...config,
      max: 10, // Reduced to avoid Supabase limits
      idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
      connectionTimeoutMillis: 5000, // Error after 5 seconds if connection fails
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
  tableName: "session", // Table name for storing sessions
  createTableIfMissing: false, // Disabled; create table manually in Supabase
  pruneSessionInterval: 60, // Clean up expired sessions every 60 seconds
});

// Session configuration
export const sessionConfig = {
  store: sessionStore,
  secret: process.env.SESSION_SECRET || "your-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production", // Secure cookies in production
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: "lax" as const,
  },
  name: "sid", // Session cookie name
};

// Clean up expired sessions
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
