import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/app/get-started/assessment/assessment-content";

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

  const handleSubmit = () => {
    // Here you would typically send the answers to your backend
    console.log("Final answers:", answers);
    console.log("Additional input:", additionalInput);
    // Navigate to results page using Next.js router
    router.push("/get-started/assessment/results");
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
    progress,
    currentSection,
    CurrentIcon,
    questions,
  };
}
