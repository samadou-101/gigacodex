// services/assessment-service.ts
import { AssessmentInput } from "@shared/schemas/assessment";
import axios from "axios";
import apiClient from "../../../lib/api-client";
import { AssessmentResponse, AssessmentResultData } from "../types";

export class AssessmentService {
  /**
   * Submit assessment to the backend
   * @param submission - The assessment data
   * @returns Promise<AssessmentResponse>
   */
  static async submitAssessment(
    submission: AssessmentInput
  ): Promise<AssessmentResponse> {
    try {
      console.log(
        "Sending assessment to backend:",
        JSON.stringify(submission, null, 2)
      );

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

      if (axios.isAxiosError(error)) {
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
