import { z } from "zod";

// Question types
export type QuestionType = "single" | "multiple";

export interface Question {
  id: number;
  section: string;
  question: string;
  options: string[];
  type: QuestionType;
  icon: any; // Using any for LucideIcon to avoid frontend dependency
}

// Answer types for individual questions
export interface AssessmentAnswer {
  questionId: number;
  answers: string[];
}

// Complete assessment submission with both form data and answers
export interface AssessmentSubmission {
  // Form data
  name: string;
  age: number;
  experienceLevel: "beginner" | "intermediate" | "advanced";
  goals: string[];
  knownLanguages?: string[];
  learningStyle?: "visual" | "auditory" | "kinesthetic";
  timePerWeek: number;
  hasComputer: boolean;
  preferredTrack: "frontend" | "backend" | "fullstack";
  otherNotes?: string;

  // Assessment answers
  answers: AssessmentAnswer[];
}

// Frontend state for tracking answers during assessment
export interface AssessmentState {
  currentQuestion: number;
  answers: Record<number, string[]>;
  selectedOptions: string[];
  additionalInput: string;
}

// Zod schemas for validation
export const assessmentAnswerSchema = z.object({
  questionId: z.number(),
  answers: z.array(z.string()),
});

export const assessmentSchema = z.object({
  name: z.string().min(1),
  age: z.number().int().min(10).max(100),
  experienceLevel: z.enum(["beginner", "intermediate", "advanced"]),
  goals: z.array(z.string()).min(1),
  knownLanguages: z.array(z.string()).optional(),
  learningStyle: z.enum(["visual", "auditory", "kinesthetic"]).optional(),
  timePerWeek: z.number().int().min(1),
  hasComputer: z.boolean(),
  preferredTrack: z.enum(["frontend", "backend", "fullstack"]),
  otherNotes: z.string().optional(),
  answers: z.array(assessmentAnswerSchema),
});

export type Assessment = z.infer<typeof assessmentSchema>;
