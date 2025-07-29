import Router from "express";
import { validateAssessment } from "./assessment.middleware.js";
import { generateAIPrompt, aiController } from "./assessment.controllers.js";

const assessmentRouter = Router();

// Submit assessment and get AI-generated results
assessmentRouter.post(
  "/submit",
  validateAssessment,
  generateAIPrompt,
  aiController
);

// Get assessment results by ID
assessmentRouter.get("/results/:id", (req, res) => {
  // TODO: Implement get results by ID
  res.json({ message: "Get results by ID - not implemented yet" });
});

export default assessmentRouter;
