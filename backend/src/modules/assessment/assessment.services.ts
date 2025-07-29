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

Based on this information and the assessment answers, generate a personalized learning roadmap for the user, starting from their current level. Make sure to align with their goals, available time, preferred track, and the specific answers they provided in the assessment.
  `.trim();
}
