// Express app setup & route mounting

import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import session from "express-session";
import sessionConfig from "./config/session.config.js";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(cookieParser());

// Session configuration with PostgreSQL store
app.use(session(sessionConfig));

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome");
});

export default app;
