import React from "react";
import { Map, TrendingUp } from "lucide-react";

interface RoadmapStep {
  title: string;
  description: string;
  durationEstimate?: number;
}

interface RoadmapProps {
  steps: RoadmapStep[];
}

const RoadmapList: React.FC<RoadmapProps> = ({ steps }) => {
  return (
    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-8 mb-12">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
          <Map className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Your Learning Roadmap
        </h2>
      </div>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-l-4 border-emerald-500"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1">
              <div className="flex items-center gap-x-4 bg-white/60 dark:bg-slate-800/60 rounded-lg p-2">
                <TrendingUp className="w-8 h-8 text-emerald-500 mr-2" />
                <span className="text-slate-700 dark:text-slate-300">
                  {step.description}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapList;
