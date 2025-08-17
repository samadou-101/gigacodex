import { AssessmentInput } from "@shared/schemas/assessment.js";

export function generatePromptFromAssessment(
  assessment: AssessmentInput
): string {
  const {
    codingConfidence,
    programmingLanguages,
    csUnderstanding,
    csTopics,
    problemSolving,
    tools,
    weeklyCommitment,
    mainGoal,
    confidence,
    interests,
    learningStyle,
    additionalNotes,
  } = assessment;

  return `
Assessment Results:
Coding Confidence: ${codingConfidence}
Programming Languages: ${programmingLanguages.join(", ")}
CS Understanding: ${csUnderstanding}
CS Topics Known: ${csTopics.join(", ")}
Problem Solving Practice: ${problemSolving}
Tools Used: ${tools.join(", ")}
Weekly Commitment: ${weeklyCommitment}
Main Goal: ${mainGoal}
Confidence Level: ${confidence}
Tech Interests: ${interests.join(", ")}
Learning Style: ${learningStyle.join(", ")}

Additional Notes: ${additionalNotes || "None"}

Based on this assessment, provide:
insights: brief, helpful feedback for the user (max 3 short points)
roadmap: detailed roadmap for the user (no specific number of nodes but detail it according to the user answers)
  `.trim();
}

// Given the user's profile and assessment answers below, return only:
// roadmap: a structured JSON object with 3–5 steps tailored to the user's current level, goals, time availability, and preferred track. Each step should include:
// title
// description
// durationEstimate (in weeks)
// the response should be short without a lot of talking becasue it will be formatted and represented on a results page
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
export function generateMockResults(assessment: AssessmentInput) {
  const { codingConfidence, mainGoal, weeklyCommitment, interests } =
    assessment;

  // Analyze answers to determine skill level and interests
  const skillLevel = determineSkillLevel(codingConfidence);
  const learningStyle = determineLearningStyle(assessment);
  const techInterests = determineInterests(interests);

  return {
    skillLevel,
    learningStyle,
    goalClarity: "Clear",
    timeCommitment: `${weeklyCommitment} hours/week`,
    preferredLanguages: determineLanguages(assessment),
    interests: techInterests,
    confidenceLevel: determineConfidenceLevel(assessment),
    insights: generateInsights(assessment),
    roadmap: generateRoadmap(assessment),
  };
}

export function determineSkillLevel(codingConfidence: string): string {
  // Analyze coding confidence to determine skill level
  if (codingConfidence === "full_apps") return "Advanced";
  if (codingConfidence === "use_apis" || codingConfidence === "simple_projects")
    return "Intermediate";
  return "Beginner";
}

export function determineLearningStyle(assessment: AssessmentInput): string {
  // Analyze learning style preferences
  if (assessment.learningStyle.includes("projects")) return "Project-Based";
  if (assessment.learningStyle.includes("video")) return "Video-Based";
  if (assessment.learningStyle.includes("reading")) return "Reading-Based";
  return "Mixed";
}

export function determineInterests(interests: string[]): string[] {
  const interestMap: Record<string, string> = {
    web: "Web Development",
    mobile: "Mobile Development",
    game: "Game Development",
    data_ai: "Data Science & AI",
  };

  return interests.map((interest) => interestMap[interest] || interest);
}

export function determineLanguages(assessment: AssessmentInput): string[] {
  // Extract language preferences from assessment
  const languageMap: Record<string, string> = {
    html_css: "HTML/CSS",
    javascript: "JavaScript",
    python: "Python",
    java_cpp: "Java/C++",
  };

  return assessment.programmingLanguages
    .filter((lang) => lang !== "none")
    .map((lang) => languageMap[lang] || lang);
}

export function determineConfidenceLevel(assessment: AssessmentInput): number {
  // Analyze confidence-related answers
  const confidenceMap: Record<string, number> = {
    getting_started: 1,
    few_basics: 2,
    simple_projects: 3,
    full_apps_help: 4,
    confident: 5,
  };

  return confidenceMap[assessment.confidence] || 3;
}

export function generateInsights(assessment: AssessmentInput): string[] {
  const insights = [];

  if (
    assessment.codingConfidence === "hello_world" ||
    assessment.codingConfidence === "not_sure"
  ) {
    insights.push(
      "You're just starting your coding journey - perfect time to build a strong foundation"
    );
  }

  if (assessment.mainGoal === "get_job") {
    insights.push(
      "You're focused on career transition - we'll prioritize job-ready skills"
    );
  }

  if (
    assessment.weeklyCommitment === "gt10" ||
    assessment.weeklyCommitment === "6_10"
  ) {
    insights.push(
      "You have good time commitment - this will accelerate your progress"
    );
  }

  return insights;
}

export function generateRoadmap(
  assessment: AssessmentInput
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
