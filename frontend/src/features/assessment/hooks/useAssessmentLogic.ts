import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/app/get-started/assessment/assessment-content";
import {
  AssessmentAnswer,
  AssessmentSubmission,
} from "@shared/schemas/assessment";
import { AssessmentService } from "../assessment.services";

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

      // Submit to backend
      const response = await AssessmentService.submitAssessment(submission);

      if (response.success && response.data) {
        // Store results in localStorage or state management
        localStorage.setItem(
          "assessmentResults",
          JSON.stringify(response.data)
        );
        router.push("/get-started/assessment/results");
      } else {
        console.error("Assessment submission failed:", response.error);
        // Handle error - show toast or error message
        alert("Failed to submit assessment. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("An error occurred while submitting your assessment.");
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
    handleSubmit,
    formatAnswersForSubmission,
    createAssessmentSubmission,
    progress,
    currentSection,
    CurrentIcon,
    questions,
  };
}
