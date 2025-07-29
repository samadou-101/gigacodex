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
