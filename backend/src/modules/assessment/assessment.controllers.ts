import { Request, Response, NextFunction } from "express";
import { generatePromptFromAssessment } from "./assessment.services.js";
import { Assessment } from "@shared/schemas/assessment.js";

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

export const aiController = (req: Request, res: Response) => {
  const assessment: Assessment = req.body;
  const prompt = req.body.prompt;

  // TODO: Integrate with actual AI service
  // For now, return mock results based on assessment data
  const results = generateMockResults(assessment);

  // Generate a unique assessment ID (in production, this would be stored in database)
  const assessmentId = `assessment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  res.json({
    success: true,
    data: {
      ...results,
      assessmentId,
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

// Mock results generator based on assessment data
function generateMockResults(assessment: Assessment) {
  const { experienceLevel, goals, preferredTrack, timePerWeek, answers } =
    assessment;

  // Analyze answers to determine skill level and interests
  const skillLevel = determineSkillLevel(answers, experienceLevel);
  const learningStyle = determineLearningStyle(answers);
  const interests = determineInterests(answers, preferredTrack);

  return {
    skillLevel,
    learningStyle,
    goalClarity: "Clear",
    timeCommitment: `${timePerWeek} hours/week`,
    preferredLanguages: determineLanguages(answers),
    interests,
    confidenceLevel: determineConfidenceLevel(answers),
    insights: generateInsights(assessment),
    roadmap: generateRoadmap(assessment),
  };
}

function determineSkillLevel(answers: any[], experienceLevel: string): string {
  // Analyze answers to determine skill level
  if (experienceLevel === "advanced") return "Advanced";
  if (experienceLevel === "intermediate") return "Intermediate";
  return "Beginner";
}

function determineLearningStyle(answers: any[]): string {
  // Analyze answers to determine learning style
  return "Project-Based";
}

function determineInterests(answers: any[], preferredTrack: string): string[] {
  const interests = [];
  if (preferredTrack === "frontend") interests.push("Frontend Development");
  if (preferredTrack === "backend") interests.push("Backend Development");
  if (preferredTrack === "fullstack") {
    interests.push("Frontend Development", "Backend Development");
  }
  return interests;
}

function determineLanguages(answers: any[]): string[] {
  // Extract language preferences from answers
  return ["JavaScript", "Python"];
}

function determineConfidenceLevel(answers: any[]): number {
  // Analyze confidence-related answers
  return 3;
}

function generateInsights(assessment: Assessment): string[] {
  const insights = [];

  if (assessment.experienceLevel === "beginner") {
    insights.push(
      "You're just starting your coding journey - perfect time to build a strong foundation"
    );
  }

  if (assessment.goals.includes("Get my first job")) {
    insights.push(
      "You're focused on career transition - we'll prioritize job-ready skills"
    );
  }

  if (assessment.timePerWeek >= 10) {
    insights.push(
      "You have good time commitment - this will accelerate your progress"
    );
  }

  return insights;
}

function generateRoadmap(assessment: Assessment): Record<string, unknown> {
  // Generate personalized roadmap based on assessment
  return {
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
  };
}
