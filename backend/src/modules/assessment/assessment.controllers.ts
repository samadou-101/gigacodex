import { Request, Response, NextFunction } from "express";
import {
  generatePromptFromAssessment,
  generateMockResults,
} from "./assessment.services.js";
import { Assessment } from "@shared/schemas/assessment.js";
import { formatAIResponse } from "./assessment.services.js";
import { getGeminiAIResponse } from "./assessment.ai.js";

export const generateAIPrompt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const assessment: Assessment = req.body;
  const prompt = generatePromptFromAssessment(assessment);

  req.body.prompt = prompt;
  next();
};

export const aiController = async (req: Request, res: Response) => {
  const assessment: Assessment = req.body;
  const prompt = req.body.prompt;

  // TODO: Integrate with actual AI service

  const aiResult = await getGeminiAIResponse(prompt);
  const formatted = formatAIResponse(aiResult.text!);
  // console.log("test before ai result");
  console.log(aiResult.text);
  // For now, return mock results based on assessment data
  const results = generateMockResults(assessment);

  // Generate a unique assessment ID (in production, this would be stored in database)
  const assessmentId = `assessment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  // console.log(prompt);
  res.json({
    success: true,
    data: {
      assessmentId,
      // aiResult,
      formatted,
    },
  });
};

export const getAssessmentResults = (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: In production, fetch from database
  // For now, return mock results based on the assessment ID
  const mockResults = {
    skillLevel: "Intermediate",
    learningStyle: "Project-Based",
    goalClarity: "Clear",
    timeCommitment: "6-10 hours/week",
    preferredLanguages: ["JavaScript", "Python", "React"],
    interests: ["Backend Development", "Database Design", "API Development"],
    confidenceLevel: 3,
    insights: [
      "You have a solid foundation in programming basics",
      "You're particularly interested in backend development",
      "You prefer learning through practical projects",
      "You have good problem-solving skills",
      "Your time commitment will allow for steady progress",
    ],
    assessmentId: id,
    roadmap: {
      phases: [
        {
          phase: 1,
          title: "Foundation",
          duration: "4-6 weeks",
          topics: [
            "Basic Programming Concepts",
            "Version Control",
            "Problem Solving",
          ],
        },
        {
          phase: 2,
          title: "Core Skills",
          duration: "8-12 weeks",
          topics: ["Web Development", "Database Design", "API Development"],
        },
        {
          phase: 3,
          title: "Advanced Topics",
          duration: "6-8 weeks",
          topics: ["Advanced Frameworks", "Testing", "Deployment"],
        },
      ],
    },
  };

  res.json({
    success: true,
    data: mockResults,
  });
};
