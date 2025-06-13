"use client";
import { Panel } from "reactflow";
import { Brain } from "lucide-react";

export const AIAssistant = () => {
  return (
    <Panel
      position="bottom-right"
      className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-lg w-80"
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold text-slate-900 dark:text-white">
            AI Assistant
          </h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Ask AI about this learning step
        </p>
        <div className="space-y-2">
          <textarea
            className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
            rows={3}
            placeholder="Ask anything about this topic..."
          />
          <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            Ask AI
          </button>
        </div>
      </div>
    </Panel>
  );
};
