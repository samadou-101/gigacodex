import { isAuthenticated } from "@/modules/auth/auth.middleware.js";
import { Router } from "express";
import { validateRoadmapData } from "../middleware/roadmap.middleware.js";
import { roadmapSavingController } from "../controllers/roadmap.controller.js";

const roadmapRouter = Router();

roadmapRouter.post(
  "/save",
  isAuthenticated,
  validateRoadmapData,
  roadmapSavingController
);

export default roadmapRouter;
