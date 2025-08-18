import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface Insight {
  title: string;
  content: string;
}

interface InsightsProps {
  insights: Insight[];
}

const Insights: React.FC<InsightsProps> = ({ insights }) => {
  return (
    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-8 mb-12">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Personalized Insights
        </h2>
      </div>
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="flex items-start p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl"
          >
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mr-3 mt-1">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              {insight.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Insights;
