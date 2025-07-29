import { AssessmentSubmission } from "@shared/schemas/assessment";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface AssessmentResponse {
  success: boolean;
  data?: {
    skillLevel: string;
    learningStyle: string;
    goalClarity: string;
    timeCommitment: string;
    preferredLanguages: string[];
    interests: string[];
    confidenceLevel: number;
    insights: string[];
    roadmap?: Record<string, unknown>;
  };
  error?: string;
}

export class AssessmentService {
  static async submitAssessment(
    submission: AssessmentSubmission
  ): Promise<AssessmentResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/assessment/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error("Error submitting assessment:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  static async getAssessmentResults(
    assessmentId: string
  ): Promise<AssessmentResponse> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/assessment/results/${assessmentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error("Error fetching assessment results:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }
}
