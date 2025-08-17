import { CheckCircle2 } from "lucide-react";
import { assessmentLabels } from "@/app/get-started/assessment/assessment-labels";

interface OptionsProps {
  options: string[];
  selectedOptions: string[];
  handleOptionSelect: (option: string) => void;
  questionId: string;
}

export default function Options({
  options,
  selectedOptions,
  handleOptionSelect,
  questionId,
}: OptionsProps) {
  const getLabel = (option: string) => {
    const labels =
      assessmentLabels[questionId as keyof typeof assessmentLabels];
    if (labels && labels[option as keyof typeof labels]) {
      return labels[option as keyof typeof labels];
    }
    return option;
  };

  return (
    <div className="space-y-4 mb-8">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleOptionSelect(option)}
          className={`w-full p-4 text-left rounded-xl border transition-all duration-300 ${
            selectedOptions.includes(option)
              ? "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800"
              : "bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
          }`}
        >
          <div className="flex items-center">
            <div
              className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                selectedOptions.includes(option)
                  ? "border-blue-600 dark:border-blue-400 bg-blue-600 dark:bg-blue-400"
                  : "border-slate-300 dark:border-slate-600"
              }`}
            >
              {selectedOptions.includes(option) && (
                <CheckCircle2 className="w-4 h-4 text-white" />
              )}
            </div>
            <span
              className={
                selectedOptions.includes(option)
                  ? "text-blue-900 dark:text-blue-100"
                  : "text-slate-700 dark:text-slate-300"
              }
            >
              {getLabel(option)}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
