"use client";
import { ThemeToggle } from "@/components/ThemeToggle";
import ProgressBar from "@/features/assessment/components/ProgressBar";
import SectionHeader from "@/features/assessment/components/SectionHeader";
import Options from "@/features/assessment/components/Options";
import NavigationButtons from "@/features/assessment/components/NavigationButtons";
import AdditionalInput from "@/features/assessment/components/AdditionalInput";
import { useAssessmentLogic } from "@/features/assessment/hooks/useAssessmentLogic";

export default function Assessment() {
  const {
    currentQuestion,
    selectedOptions,
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
  } = useAssessmentLogic();

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
