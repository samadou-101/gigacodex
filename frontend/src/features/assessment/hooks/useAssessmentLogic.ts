"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/app/get-started/assessment/assessment-content";
import { AssessmentInput } from "@shared/schemas/assessment";
import { AssessmentService } from "../services";

export function useAssessmentLogic() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState<Partial<AssessmentInput>>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState("");

  const currentQuestion = questions[currentQuestionIndex];

  // Select option(s)
  const handleOptionSelect = (option: string) => {
    if (currentQuestion.type === "single") {
      setSelectedOptions([option]);
    } else {
      setSelectedOptions((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
      );
    }
  };

  // Next
  const handleNext = () => {
    // Save current question's answer
    const answer =
      currentQuestion.type === "single" ? selectedOptions[0] : selectedOptions;
    console.log(`Saving answer for ${currentQuestion.id}:`, answer);

    setFormData((prev) => {
      const newFormData = {
        ...prev,
        [currentQuestion.id]: answer,
      };
      console.log("Updated form data:", newFormData);
      return newFormData;
    });

    setSelectedOptions([]);

    // Move to next step
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  // Previous
  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => prev - 1);
    const prevQuestion = questions[currentQuestionIndex - 1];
    const prevAnswer = formData[prevQuestion.id];

    if (typeof prevAnswer === "string") {
      setSelectedOptions([prevAnswer]);
    } else if (Array.isArray(prevAnswer)) {
      setSelectedOptions(prevAnswer);
    } else {
      setSelectedOptions([]);
    }
  };

  // Save current question's answer (used before submission)
  const saveCurrentAnswer = () => {
    setFormData((prev) => ({
      ...prev,
      [currentQuestion.id]:
        currentQuestion.type === "single"
          ? selectedOptions[0]
          : selectedOptions,
    }));
  };

  // Submit
  const handleSubmit = async () => {
    try {
      // If we're in the additional input step, currentQuestion is undefined
      // All answers should already be in formData
      let formDataWithCurrent = { ...formData };

      // Only try to get current answer if we're still on a question
      if (currentQuestion && currentQuestionIndex < questions.length) {
        const currentAnswer =
          currentQuestion.type === "single"
            ? selectedOptions[0]
            : selectedOptions;
        formDataWithCurrent = {
          ...formData,
          [currentQuestion.id]: currentAnswer,
        };
      }

      // Generate a proper UUID format
      const tempUserId = crypto.randomUUID();

      const data: AssessmentInput = {
        ...formDataWithCurrent,
        userId: tempUserId,
        additionalNotes: additionalNotes.trim() || undefined,
      } as AssessmentInput;

      console.log("Submitting assessment data:", data);

      const response = await AssessmentService.submitAssessment(data);

      if (response.success && response.data) {
        if (response.data.assessmentId) {
          localStorage.setItem(
            "currentAssessmentId",
            response.data.assessmentId
          );
        }
        localStorage.setItem(
          "assessmentResults",
          JSON.stringify(response.data)
        );

        const assessmentId = response.data.assessmentId;
        router.push(
          `/get-started/assessment/results?assessmentId=${assessmentId}`
        );
        return;
      } else {
        throw new Error(response.error || "Failed to submit assessment");
      }
    } catch (error) {
      console.error("Error submitting assessment:", error);
      throw error;
    }
  };

  const progress =
    currentQuestionIndex >= questions.length
      ? 100
      : (currentQuestionIndex / questions.length) * 100;
  const currentSection =
    currentQuestionIndex >= questions.length
      ? "Final Step"
      : currentQuestion.section;
  const CurrentIcon =
    currentQuestionIndex >= questions.length
      ? questions[questions.length - 1].icon
      : currentQuestion.icon;

  return {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    currentQuestion,
    formData,
    setFormData,
    selectedOptions,
    setSelectedOptions,
    additionalNotes,
    setAdditionalNotes,
    handleOptionSelect,
    handleNext,
    handlePrevious,
    saveCurrentAnswer,
    handleSubmit: handleSubmit as () => Promise<void>,
    progress,
    currentSection,
    CurrentIcon,
    questions,
  };
}
