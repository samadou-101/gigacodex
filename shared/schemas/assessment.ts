// shared/schema/assessment-schema.ts
import { z } from "zod";

// ------------------------------------
// Schema: One property per question
// ------------------------------------
export const AssessmentSchema = z.object({
  userId: z.string().uuid(), // if you want to track user

  // Q1: Skill level (single choice)
  codingConfidence: z.enum([
    "hello_world",
    "simple_projects",
    "use_apis",
    "full_apps",
    "not_sure",
  ]),

  // Q2: Languages (multiple choice)
  programmingLanguages: z.array(
    z.enum(["html_css", "javascript", "python", "java_cpp", "none"])
  ),

  // Q3: CS concepts confidence (single choice)
  csUnderstanding: z.enum([
    "not_familiar",
    "basics",
    "ds_algo",
    "systems",
    "theory_confident",
  ]),

  // Q4: CS topics known (multiple)
  csTopics: z.array(
    z.enum([
      "arrays_lists",
      "big_o",
      "recursion",
      "http_tcp_dns",
      "memory_threads",
      "none",
    ])
  ),

  // Q5: Problem-solving practice (single)
  problemSolving: z.enum([
    "not_yet",
    "few_problems",
    "regular",
    "timed_challenges",
  ]),

  // Q6: Tools used (multiple)
  tools: z.array(
    z.enum(["editors", "git", "browser_devtools", "terminal", "none"])
  ),

  // Q7: Weekly time (single)
  weeklyCommitment: z.enum(["lt3", "3_5", "6_10", "gt10"]),

  // Q8: Goal (single)
  mainGoal: z.enum(["get_job", "freelance", "projects", "exploring"]),

  // Q9: Confidence scale (single)
  confidence: z.enum([
    "getting_started",
    "few_basics",
    "simple_projects",
    "full_apps_help",
    "confident",
  ]),

  // Q10: Tech interests (multiple)
  interests: z.array(z.enum(["web", "mobile", "game", "data_ai", "not_sure"])),

  // Q11: Learning style (multiple)
  learningStyle: z.array(
    z.enum(["video", "reading", "projects", "help_when_stuck", "mix"])
  ),

  // Optional additional notes/input
  additionalNotes: z.string().optional(),
});

export type AssessmentInput = z.infer<typeof AssessmentSchema>;
