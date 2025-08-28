import { Request, Response, NextFunction } from "express";
import {
  generatePromptFromAssessment,
  toReactFlowRoadmap,
} from "./assessment.services.js";
import { AssessmentInput } from "@shared/schemas/assessment.js";
// import { formatAIResponse } from "./assessment.services.js";
import { getGeminiAIResponse } from "./assessment.ai.js";
import { RoadmapService } from "@modules/roadmap/services/roadmap.service.js";

export const generateAIPrompt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const assessment: AssessmentInput = req.body;
  const prompt = generatePromptFromAssessment(assessment);
  req.body.prompt = prompt;
  next();
};

export const aiController = async (req: Request, res: Response) => {
  const prompt = req.body.prompt;
  const data = await getGeminiAIResponse(prompt);
  const assessmentId = `assessment_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 11)}`;

  try {
    const userId = req.session.user?.id;
    if (userId) {
      const maybeRoadmap = (data && (data as any).roadmap) || null;
      if (maybeRoadmap && typeof maybeRoadmap === "object") {
        const reactFlowRoadmap = toReactFlowRoadmap(maybeRoadmap);
        await RoadmapService.saveRoadmap(userId, reactFlowRoadmap);
      }
    }
  } catch (err) {
    console.error("Failed to save roadmap from assessment:", err);
  }

  res.json({
    success: true,
    assessmentId,
    data,
  });
};
