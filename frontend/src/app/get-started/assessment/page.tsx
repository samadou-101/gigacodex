"use client";
import { ThemeToggle } from "@/components/ThemeToggle";
import ProgressBar from "@/features/assessment/components/ProgressBar";
import SectionHeader from "@/features/assessment/components/SectionHeader";
import Options from "@/features/assessment/components/Options";
import NavigationButtons from "@/features/assessment/components/NavigationButtons";
import AdditionalInput from "@/features/assessment/components/AdditionalInput";
import SubmitButton from "@/features/assessment/components/SubmitButton";
import { useAssessmentLogic } from "@/features/assessment/hooks/useAssessmentLogic";

export default function Assessment() {
  const {
    currentQuestionIndex,
    currentQuestion,
    selectedOptions,
    additionalNotes,
    setAdditionalNotes,
    handleOptionSelect,
    handleNext,
    handlePrevious,
    handleSubmit,
    progress,
    currentSection,
    CurrentIcon,
    questions,
    setCurrentQuestionIndex,
  } = useAssessmentLogic();

  // If we're at the additional input step (after all questions)
  if (currentQuestionIndex === questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">
        {/* Theme Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <div className="container mx-auto max-w-3xl px-6 py-8">
          <ProgressBar progress={100} label="Final Step" />
          <SectionHeader
            icon={CurrentIcon}
            section={currentSection}
            question="Any additional notes or specific areas you'd like us to focus on?"
          />
          <AdditionalInput
            additionalInput={additionalNotes}
            setAdditionalInput={setAdditionalNotes}
            maxCharacters={500}
          />
          <div className="flex justify-center mt-8">
            <SubmitButton onSubmit={handleSubmit} />
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setCurrentQuestionIndex(questions.length - 1)}
              className="flex items-center px-6 py-3 bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl font-semibold transition-all duration-300"
            >
              ← Back to Previous Question
            </button>
          </div>
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
          label={`Question ${currentQuestionIndex + 1} of ${questions.length}`}
        />
        <SectionHeader
          icon={CurrentIcon}
          section={currentSection}
          question={currentQuestion.question}
        />
        <Options
          options={currentQuestion.options}
          selectedOptions={selectedOptions}
          handleOptionSelect={handleOptionSelect}
          questionId={currentQuestion.id}
        />
        <NavigationButtons
          currentQuestion={currentQuestionIndex}
          selectedOptions={selectedOptions}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          handleSubmit={handleSubmit}
          isLastQuestion={false}
        />
      </div>
    </div>
  );
}
