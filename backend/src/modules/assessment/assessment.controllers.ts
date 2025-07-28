import { Request, Response, NextFunction } from "express";
import { generatePromptFromAssessment } from "./assessment.services.js";

export const generateAIPrompt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const assessment = req.body;
  const prompt = generatePromptFromAssessment(assessment);

  req.body.prompt = prompt;
  next();
};

export const aiController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pormpt = req.body.prompt;
};
