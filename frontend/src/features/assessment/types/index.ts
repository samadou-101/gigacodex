import { AssessmentInput } from "@shared/schemas/assessment";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AssessmentResultData {
  skillLevel: string;
  learningStyle: string;
  goalClarity: string;
  timeCommitment: string;
  preferredLanguages: string[];
  interests: string[];
  confidenceLevel: number;
  insights: string[];
  assessmentId?: string;
  roadmap?: {
    phases: Array<{
      phase: number;
      title: string;
      duration: string;
      topics: string[];
    }>;
  };
}

export interface AssessmentResponse {
  success: boolean;
  data?: AssessmentResultData;
  error?: string;
}

export type QuestionType = "single" | "multiple";

export interface Question {
  // id: number;
  id: keyof AssessmentInput;
  section: string;
  question: string;
  options: string[];
  type: QuestionType;
  icon: any;
  additionalInput?: string;
}
