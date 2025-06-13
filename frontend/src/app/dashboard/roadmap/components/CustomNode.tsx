"use client";
import { NodeProps } from "reactflow";
import { Code2 } from "lucide-react";

interface CustomNodeData {
  label: string;
  description: string;
  tag?: string;
  link?: string;
}

export const CustomNode = ({ data, selected }: NodeProps<CustomNodeData>) => {
  return (
    <div
      className={`p-2 rounded-lg border-2 shadow-lg transition-all duration-300 ${
        selected
          ? "border-blue-500 bg-blue-50 dark:bg-blue-950/50"
          : "border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90"
      }`}
    >
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
          <Code2 className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            {data.label}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};
