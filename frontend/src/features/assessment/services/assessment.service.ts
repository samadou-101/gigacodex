import { AssessmentSubmission } from "@shared/schemas/assessment";
import axios from "axios";
import apiClient from "./api-client";
import { AssessmentResponse, AssessmentResultData } from "./types";

export class AssessmentService {
  /**
   * Submit assessment to the backend
   * @param submission - The assessment submission data
   * @returns Promise<AssessmentResponse>
   */
  static async submitAssessment(
    submission: AssessmentSubmission
  ): Promise<AssessmentResponse> {
    try {
      // Validate required fields before sending
      if (
        !submission.name ||
        !submission.age ||
        !submission.experienceLevel ||
        !submission.goals ||
        !submission.timePerWeek ||
        submission.hasComputer === undefined ||
        !submission.preferredTrack ||
        !submission.answers
      ) {
        return {
          success: false,
          error: "Missing required fields in assessment submission",
        };
      }

      console.log(
        "Sending assessment to backend:",
        JSON.stringify(submission, null, 2)
      );

      // Send the submission data directly to the backend
      const response = await apiClient.post(
        "/api/assessment/submit",
        submission
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error submitting assessment:", error);

      // Handle axios error response
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response?.data);
        return {
          success: false,
          error:
            error.response?.data?.error ||
            error.response?.data?.message ||
            error.message ||
            "Failed to submit assessment",
        };
      }

      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  /**
   * Fetch assessment results by ID
   * @param assessmentId - The assessment ID
   * @returns Promise<AssessmentResponse>
   */
  static async getAssessmentResults(
    assessmentId: string
  ): Promise<AssessmentResponse> {
    try {
      const response = await apiClient.get(
        `/api/assessment/results/${assessmentId}`
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching assessment results:", error);

      // Handle axios error response
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error:
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch assessment results",
        };
      }

      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  /**
   * Get assessment results with better error handling
   * @param assessmentId - The assessment ID
   * @returns Promise<AssessmentResultData | null>
   */
  static async getAssessmentResultsData(
    assessmentId: string
  ): Promise<AssessmentResultData | null> {
    try {
      const response = await this.getAssessmentResults(assessmentId);

      if (response.success && response.data) {
        return response.data;
      }

      console.error("Failed to get assessment results:", response.error);
      return null;
    } catch (error) {
      console.error("Error in getAssessmentResultsData:", error);
      return null;
    }
  }
}
