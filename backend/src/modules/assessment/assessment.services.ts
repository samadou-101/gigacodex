import { Assessment } from "@shared/schemas/assessment.js";

export function generatePromptFromAssessment(assessment: Assessment): string {
  const {
    name,
    age,
    experienceLevel,
    goals,
    knownLanguages,
    learningStyle,
    timePerWeek,
    hasComputer,
    preferredTrack,
    otherNotes,
    answers,
  } = assessment;

  // Format answers for the prompt
  const answersText = answers
    .map(
      (answer) => `Question ${answer.questionId}: ${answer.answers.join(", ")}`
    )
    .join("\n");

  return `
Name: ${name}
Age: ${age}
Experience Level: ${experienceLevel}
Goals: ${goals.join(", ")}
Known Languages: ${knownLanguages?.join(", ") || "None"}
Learning Style: ${learningStyle || "Not specified"}
Time Available per Week: ${timePerWeek} hours
Has a Computer: ${hasComputer ? "Yes" : "No"}
Preferred Track: ${preferredTrack}
Additional Notes: ${otherNotes || "None"}

Assessment Answers:
${answersText}

Given the user's profile and assessment answers below, return only:
insights: brief, helpful feedback for the user (max 3 short points)
roadmap: a structured JSON object with 3–5 steps tailored to the user’s current level, goals, time availability, and preferred track. Each step should include:
title
description
durationEstimate (in weeks)
the response should be short without a lot of talking becasue it will be formatted and represented on a results page
  `.trim();
}

export function formatAIResponse(rawText: string | undefined) {
  if (!rawText) return {};

  const [insightsRaw, roadmapRaw] = rawText.split("roadmap:");
  const insightsList = insightsRaw
    .replace(/^insights:\s*/i, "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.replace(/^\*+\s*/, ""));

  const insights: Record<string, string> = {};
  insightsList.forEach((text, index) => {
    insights[`${index + 1}`] = text.replace(/^\d+\.\s*/, ""); // Remove leading numbering like "1. "
  });
  // const insights = insightsRaw
  //   .replace(/^insights:\s*/i, "")
  //   .split("\n")
  //   .map((s) => s.trim())
  //   .filter(Boolean)
  //   .map((s) => s.replace(/^\*+\s*/, ""));

  let roadmap = [];

  try {
    const roadmapJson =
      roadmapRaw.match(/```json([\s\S]*?)```/)?.[1]?.trim() ??
      roadmapRaw.trim();

    if (roadmapJson) {
      roadmap = JSON.parse(roadmapJson);
    }
  } catch (e) {
    console.error("Failed to parse roadmap JSON:", e);
  }

  return { insights, roadmap };
}

// Mock results generator based on assessment data
export function generateMockResults(assessment: Assessment) {
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

export function determineSkillLevel(
  answers: any[],
  experienceLevel: string
): string {
  // Analyze answers to determine skill level
  if (experienceLevel === "advanced") return "Advanced";
  if (experienceLevel === "intermediate") return "Intermediate";
  return "Beginner";
}

export function determineLearningStyle(answers: any[]): string {
  // Analyze answers to determine learning style
  return "Project-Based";
}

export function determineInterests(
  answers: any[],
  preferredTrack: string
): string[] {
  const interests = [];
  if (preferredTrack === "frontend") interests.push("Frontend Development");
  if (preferredTrack === "backend") interests.push("Backend Development");
  if (preferredTrack === "fullstack") {
    interests.push("Frontend Development", "Backend Development");
  }
  return interests;
}

export function determineLanguages(answers: any[]): string[] {
  // Extract language preferences from answers
  return ["JavaScript", "Python"];
}

export function determineConfidenceLevel(answers: any[]): number {
  // Analyze confidence-related answers
  return 3;
}

export function generateInsights(assessment: Assessment): string[] {
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

export function generateRoadmap(
  assessment: Assessment
): Record<string, unknown> {
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
