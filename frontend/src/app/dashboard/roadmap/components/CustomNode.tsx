"use client";
import { NodeProps, Handle, Position } from "reactflow";

interface CustomNodeData {
  label: string;
  description: string;
  tag?: string;
  link?: string;
  number?: number;
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
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500"
      />
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
          {data.number}
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
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500"
      />
    </div>
  );
};
