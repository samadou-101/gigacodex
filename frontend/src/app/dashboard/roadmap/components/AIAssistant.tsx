"use client";
import { Panel } from "reactflow";
import { Brain } from "lucide-react";

interface AIAssistantProps {
  onClose: () => void;
}

export function AIAssistant({ onClose }: AIAssistantProps) {
  return (
    <Panel position="bottom-right" className="w-80">
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              AI Assistant
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <svg
              className="w-4 h-4 text-slate-600 dark:text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Ask me anything about your learning steps or get suggestions for your
          roadmap.
        </p>
        <textarea
          placeholder="Type your question here..."
          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 mb-4"
          rows={3}
        />
        <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
          Ask AI
        </button>
      </div>
    </Panel>
  );
}
