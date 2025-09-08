// Express app setup & route mounting

import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import session from "express-session";
import sessionConfig from "./config/session.config.js";
import authRoutes from "./modules/auth/auth.routes.js";
import assessmentRouter from "./modules/assessment/assessment.routes.js";
import roadmapRouter from "./modules/roadmap/routes/roadmap.route.js";
import planRouter from "./modules/learning-plan/plan.route.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());

// Session configuration with PostgreSQL store
app.use(session(sessionConfig));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/assessment", assessmentRouter);
app.use("/api/roadmap", roadmapRouter);
app.use("/api/plan", planRouter);
app.get("/", (req, res) => {
  res.send("Welcome");
});

export default app;
