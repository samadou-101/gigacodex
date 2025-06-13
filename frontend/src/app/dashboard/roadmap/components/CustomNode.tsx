"use client";
import { NodeProps, Handle, Position } from "reactflow";
import { Edit2, Brain, BookOpen } from "lucide-react";
import { useState } from "react";

interface CustomNodeData {
  label: string;
  description: string;
  number?: number;
}

export function CustomNode({ data, selected }: NodeProps<CustomNodeData>) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div
      className={`group p-5 rounded-xl border-2 transition-all duration-300 ${
        selected
          ? "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800 shadow-lg"
          : "bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700"
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500"
      />
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-400 font-semibold text-sm">
          {data.number}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
            {data.label}
          </h3>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500"
      />
      {/* Hover Actions */}
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          data-action="read"
          onClick={() => setShowDescription(!showDescription)}
          className="p-2 rounded-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:bg-green-50 dark:hover:bg-green-900/50 hover:border-green-200 dark:hover:border-green-800 transition-all duration-300"
          title="Read More"
        >
          <BookOpen className="w-4 h-4 text-green-600 dark:text-green-400" />
        </button>
        <button
          data-action="edit"
          className="p-2 rounded-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/50 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300"
          title="Edit Node"
        >
          <Edit2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </button>
        <button
          data-action="ai"
          className="p-2 rounded-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:bg-purple-50 dark:hover:bg-purple-900/50 hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300"
          title="Ask AI"
        >
          <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        </button>
      </div>
      {/* Description Modal */}
      {showDescription && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-lg w-full mx-4 shadow-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                {data.label}
              </h3>
              <button
                onClick={() => setShowDescription(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-slate-500 dark:text-slate-400"
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
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
