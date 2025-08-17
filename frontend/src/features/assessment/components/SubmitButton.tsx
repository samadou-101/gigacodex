import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";

interface SubmitButtonProps {
  onSubmit: () => Promise<void>;
  disabled?: boolean;
}

export default function SubmitButton({
  onSubmit,
  disabled = false,
}: SubmitButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitClick = async () => {
    if (isSubmitting || disabled) return;

    setIsSubmitting(true);
    try {
      await onSubmit();
      // Don't reset loading state if submission was successful
      // The component will unmount during navigation
    } catch (error) {
      console.error("Error submitting assessment:", error);
      setIsSubmitting(false);
      alert("Failed to submit assessment. Please try again.");
    }
  };

  return (
    <button
      onClick={handleSubmitClick}
      disabled={isSubmitting || disabled}
      className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-slate-400 disabled:to-slate-500 text-white rounded-xl font-semibold transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 disabled:hover:scale-100 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] opacity-50 dark:opacity-20"></div>
      <div className="relative flex items-center">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CheckCircle2 className="mr-3 h-6 w-6" />
            Get Your Personalized Path
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" />
          </>
        )}
      </div>
    </button>
  );
}
