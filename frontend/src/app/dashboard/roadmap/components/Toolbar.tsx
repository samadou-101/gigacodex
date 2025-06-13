"use client";
import { Panel } from "reactflow";
import { Plus, Trash2, Save, Upload, Map } from "lucide-react";

interface ToolbarProps {
  onAddNode: () => void;
  onDeleteSelected: () => void;
  onSave: () => void;
  onLoad: () => void;
  showMiniMap: boolean;
  onToggleMiniMap: () => void;
}

export const Toolbar = ({
  onAddNode,
  onDeleteSelected,
  onSave,
  onLoad,
  showMiniMap,
  onToggleMiniMap,
}: ToolbarProps) => {
  return (
    <Panel position="top-left" className="flex gap-2 p-2">
      <button
        onClick={onAddNode}
        className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        title="Add new step"
      >
        <Plus className="w-5 h-5" />
      </button>

      <button
        onClick={onDeleteSelected}
        className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-red-500 dark:hover:border-red-400 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        title="Delete selected"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      <button
        onClick={onSave}
        className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-green-500 dark:hover:border-green-400 text-slate-700 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
        title="Save roadmap"
      >
        <Save className="w-5 h-5" />
      </button>

      <button
        onClick={onLoad}
        className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        title="Load roadmap"
      >
        <Upload className="w-5 h-5" />
      </button>

      <button
        onClick={onToggleMiniMap}
        className={`p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
          showMiniMap ? "text-blue-600 dark:text-blue-400" : ""
        }`}
        title={showMiniMap ? "Hide minimap" : "Show minimap"}
      >
        <Map className="w-5 h-5" />
      </button>
    </Panel>
  );
};
