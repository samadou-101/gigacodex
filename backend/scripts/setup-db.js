#!/usr/bin/env node

import { execSync } from "child_process";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

console.log("🚀 Setting up localhost PostgreSQL database...\n");

// Check if .env file exists
const envPath = join(process.cwd(), ".env");
if (!existsSync(envPath)) {
  console.log("📝 Creating .env file...");
  const envContent = `# Database Configuration
DATABASE_URL="postgresql://postgres:password@localhost:5432/gigacodex_db"

# Server Configuration
PORT=4000
NODE_ENV=development

# Session Configuration
SESSION_SECRET=your-super-secret-session-key-change-this-in-production
`;
  writeFileSync(envPath, envContent);
  console.log("✅ .env file created");
} else {
  console.log("✅ .env file already exists");
}

console.log("\n📋 PostgreSQL Setup Instructions:");
console.log("1. Make sure PostgreSQL is installed and running");
console.log("2. Create a database: CREATE DATABASE gigacodex_db;");
console.log(
  "3. Update the DATABASE_URL in .env if your credentials are different"
);
console.log("4. Run: npx prisma migrate dev --schema=src/prisma/schema.prisma");
console.log("5. Run: npm run dev");

console.log("\n🔧 Default connection details:");
console.log("- Host: localhost");
console.log("- Port: 5432");
console.log("- Database: gigacodex_db");
console.log("- Username: postgres");
console.log("- Password: password");

console.log(
  "\n💡 If you need to change these, update the DATABASE_URL in .env file"
);
console.log(
  "Example: postgresql://username:password@localhost:5432/database_name"
);
