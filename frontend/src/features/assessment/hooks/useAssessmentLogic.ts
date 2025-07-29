import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/app/get-started/assessment/assessment-content";
import {
  AssessmentAnswer,
  AssessmentSubmission,
} from "@shared/schemas/assessment";
import { AssessmentService } from "../services";

export function useAssessmentLogic() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [additionalInput, setAdditionalInput] = useState("");
  const maxCharacters = 500;

  const handleOptionSelect = (option: string) => {
    if (questions[currentQuestion].type === "single") {
      setSelectedOptions([option]);
    } else {
      setSelectedOptions((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
      );
    }
  };

  const handleNext = () => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: selectedOptions,
    }));
    setSelectedOptions([]);
    setCurrentQuestion((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => prev - 1);
    setSelectedOptions(answers[questions[currentQuestion - 1].id] || []);
  };

  // Convert answers to the proper format for backend submission
  const formatAnswersForSubmission = (): AssessmentAnswer[] => {
    return Object.entries(answers).map(([questionId, answers]) => ({
      questionId: parseInt(questionId),
      answers,
    }));
  };

  // Create complete assessment submission
  const createAssessmentSubmission = (formData: {
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
  }): AssessmentSubmission => {
    return {
      ...formData,
      answers: formatAnswersForSubmission(),
    };
  };

  const handleSubmit = async () => {
    try {
      const formattedAnswers = formatAnswersForSubmission();
      console.log("Formatted answers for backend:", formattedAnswers);
      console.log("Additional input:", additionalInput);

      // Create a complete submission (you would get this data from a form)
      const submission = createAssessmentSubmission({
        name: "User Name", // This should come from a form
        age: 25, // This should come from a form
        experienceLevel: "beginner", // This should come from a form
        goals: ["Get my first job"], // This should come from a form
        timePerWeek: 10, // This should come from a form
        hasComputer: true, // This should come from a form
        preferredTrack: "frontend", // This should come from a form
        otherNotes: additionalInput,
      });

      console.log(
        "Complete submission object:",
        JSON.stringify(submission, null, 2)
      );

      // Submit to backend
      const response = await AssessmentService.submitAssessment(submission);

      console.log("Backend Response:", response);
      console.log("Response Data:", response.data);

      if (response.success && response.data) {
        console.log("Assessment submitted successfully, redirecting...");

        // Store assessment ID in sessionStorage for immediate use
        if (response.data.assessmentId) {
          sessionStorage.setItem(
            "currentAssessmentId",
            response.data.assessmentId
          );
        }

        // Store results in sessionStorage for immediate access
        sessionStorage.setItem(
          "assessmentResults",
          JSON.stringify(response.data)
        );

        // Navigate to results page
        console.log("About to navigate to:", "/get-started/assessment/results");

        // Try different path formats
        const paths = [
          "/get-started/assessment/results",
          "get-started/assessment/results",
          "/assessment/results",
          "assessment/results",
        ];

        for (const path of paths) {
          try {
            console.log(`Trying path: ${path}`);
            router.push(path);
            console.log(`Navigation successful with path: ${path}`);
            break;
          } catch {
            console.log(`Failed with path: ${path}`);
          }
        }

        console.log("Navigation initiated");

        // Don't throw any errors after successful submission
        return;
      } else {
        console.error("Assessment submission failed:", response.error);
        throw new Error(response.error || "Failed to submit assessment");
      }
    } catch (error) {
      console.error("Error submitting assessment:", error);
      throw error; // Re-throw to let the component handle the loading state
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentSection = questions[currentQuestion].section;
  const CurrentIcon = questions[currentQuestion].icon;

  return {
    currentQuestion,
    setCurrentQuestion,
    answers,
    setAnswers,
    selectedOptions,
    setSelectedOptions,
    additionalInput,
    setAdditionalInput,
    maxCharacters,
    handleOptionSelect,
    handleNext,
    handlePrevious,
    handleSubmit: handleSubmit as () => Promise<void>,
    formatAnswersForSubmission,
    createAssessmentSubmission,
    progress,
    currentSection,
    CurrentIcon,
    questions,
  };
}
