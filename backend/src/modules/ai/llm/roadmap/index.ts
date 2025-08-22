import { AssessmentInput } from "@shared/schemas/assessment.js";

export const getRoadmapPrompt = (assessment: AssessmentInput): string => {
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

  const prompt =
    `  You are an expert software engineering mentor. Based on the following user assessment, create:
1. **Insights**: 3 short, actionable points tailored to the user's background.
2. **Roadmap**: A detailed, structured learning roadmap adapted to the user's level, main goal, and weekly time commitment. The roadmap must include:
   - Stages (e.g., Foundations, Core Programming, Specialization, Projects)
   - For each stage:
       - Description of what the learner will achieve
       - Detailed topics to cover (concept by concept)
       - Example exercises or mini-projects for practice
       - Estimated time for each stage (based on weekly commitment)
   - Keep the roadmap practical and progressive (start from basics if the user is a beginner, include advanced topics if the user is experienced).

The roadmap should **not** be vague (e.g., “Learn HTML and CSS”). It should break down concepts step by step:
✔ Example: Instead of "Learn Python," write:
   - Understand variables and data types
   - Learn control structures (if, else, loops)
   - Practice with 10 small problems
   - Build a CLI calculator project

Use these details:
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

Output format:
Insights:
- [Point 1]
- [Point 2]
- [Point 3]

Roadmap:
Stage 1: Foundations
- Description
- Topics
- Practice
- Estimated Time

Stage 2: Core Programming
...

`.trim();
  return prompt;
};
