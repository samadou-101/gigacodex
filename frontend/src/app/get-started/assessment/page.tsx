"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "./assessment-content";
import ProgressBar from "@/components/pages/assessment/ProgressBar";
import SectionHeader from "@/components/pages/assessment/SectionHeader";
import Options from "@/components/pages/assessment/Options";
import NavigationButtons from "@/components/pages/assessment/NavigationButtons";
import AdditionalInput from "@/components/pages/assessment/AdditionalInput";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Assessment() {
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

  // If we're at the last question, show the additional input section
  if (currentQuestion === questions.length - 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">
        {/* Theme Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <div className="container mx-auto max-w-3xl px-6 py-8">
          <ProgressBar progress={100} label="Final Step" />
          <AdditionalInput
            additionalInput={additionalInput}
            setAdditionalInput={setAdditionalInput}
            maxCharacters={maxCharacters}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <div className="container mx-auto max-w-3xl px-6 py-8">
        <ProgressBar
          progress={progress}
          label={`Question ${currentQuestion + 1} of ${questions.length}`}
        />
        <SectionHeader
          icon={CurrentIcon}
          section={currentSection}
          question={questions[currentQuestion].question}
        />
        <Options
          options={questions[currentQuestion].options}
          selectedOptions={selectedOptions}
          handleOptionSelect={handleOptionSelect}
        />
        <NavigationButtons
          currentQuestion={currentQuestion}
          questionsLength={questions.length}
          selectedOptions={selectedOptions}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
