import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

interface NavigationButtonsProps {
  currentQuestion: number;
  questionsLength: number;
  selectedOptions: string[];
  handlePrevious: () => void;
  handleNext: () => void;
  handleSubmit: () => Promise<void>;
}

export default function NavigationButtons({
  currentQuestion,
  questionsLength,
  selectedOptions,
  handlePrevious,
  handleNext,
  handleSubmit,
}: NavigationButtonsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitClick = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await handleSubmit();
      // Don't reset loading state if submission was successful
      // The component will unmount during navigation
    } catch (error) {
      console.error("Error submitting assessment:", error);
      setIsSubmitting(false);
      alert("Failed to submit assessment. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-between">
      {currentQuestion > 0 ? (
        <button
          onClick={handlePrevious}
          disabled={isSubmitting}
          className="flex items-center px-6 py-3 bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Previous
        </button>
      ) : (
        <div />
      )}

      {currentQuestion < questionsLength - 1 ? (
        <button
          onClick={handleNext}
          disabled={selectedOptions.length === 0 || isSubmitting}
          className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            selectedOptions.length > 0 && !isSubmitting
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:scale-105 shadow-lg shadow-blue-500/25"
              : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
          }`}
        >
          Next
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      ) : (
        <button
          onClick={handleSubmitClick}
          disabled={selectedOptions.length === 0 || isSubmitting}
          className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            selectedOptions.length > 0 && !isSubmitting
              ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white hover:scale-105 shadow-lg shadow-green-500/25"
              : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Submit Assessment
              <CheckCircle2 className="ml-2 h-5 w-5" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
