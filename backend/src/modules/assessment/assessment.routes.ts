import Router from "express";
import { validateAssessment } from "./assessment.middleware.js";
import {
  generateAIPrompt,
  aiController,
  getAssessmentResults,
} from "./assessment.controllers.js";

const assessmentRouter = Router();

// Submit assessment and get AI-generated results
assessmentRouter.post(
  "/submit",
  validateAssessment,
  generateAIPrompt,
  aiController
);

// Get assessment results by ID
assessmentRouter.get("/results/:id", getAssessmentResults);

export default assessmentRouter;
