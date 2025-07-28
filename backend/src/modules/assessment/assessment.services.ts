import { Assessment } from "./assessment.validation.js";

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
  } = assessment;

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

Based on this information, generate a personalized learning roadmap for the user, starting from their current level. Make sure to align with their goals, available time, and preferred track.
  `.trim();
}
