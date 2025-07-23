import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

interface AdditionalInputProps {
  additionalInput: string;
  setAdditionalInput: (value: string) => void;
  maxCharacters: number;
  handleSubmit: () => void;
}

export default function AdditionalInput({
  additionalInput,
  setAdditionalInput,
  maxCharacters,
  handleSubmit,
}: AdditionalInputProps) {
  return (
    <div className="mb-8">
      <div className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-950/50 rounded-full text-purple-700 dark:text-purple-400 font-semibold text-sm mb-4">
        <Sparkles className="w-4 h-4 mr-2" />
        Personal Touch
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
        Help Us Understand You Better
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Share any additional thoughts, goals, or challenges you&apos;re facing.
        This helps our AI create a more personalized learning path just for you.
      </p>

      <div className="relative">
        <textarea
          value={additionalInput}
          onChange={(e) =>
            setAdditionalInput(e.target.value.slice(0, maxCharacters))
          }
          placeholder="Tell us about your learning goals, challenges, or anything else you'd like us to know..."
          className="w-full h-48 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-300 resize-none text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500"
        />
        <div className="absolute bottom-4 right-4 text-sm text-slate-500 dark:text-slate-400">
          {additionalInput.length}/{maxCharacters} characters
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100">
              Pro Tip
            </h3>
            <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
              The more you share, the better we can tailor your learning
              experience. Consider mentioning:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-blue-600 dark:text-blue-400">
              <li>• Specific areas you want to focus on</li>
              <li>• Previous learning experiences</li>
              <li>• Time constraints or preferences</li>
              <li>• Career goals or aspirations</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] opacity-50 dark:opacity-20"></div>
          <div className="relative flex items-center">
            <CheckCircle2 className="mr-3 h-6 w-6" />
            Get Your Personalized Path
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" />
          </div>
        </button>
      </div>
    </div>
  );
}
