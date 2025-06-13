"use client";
import { Panel } from "reactflow";
import { Plus, Save, Trash2, Map } from "lucide-react";

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
    <Panel
      position="top-left"
      className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-lg"
    >
      <div className="flex items-center space-x-2">
        <button
          onClick={onAddNode}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          title="Add Node"
        >
          <Plus className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>
        <button
          onClick={onDeleteSelected}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          title="Delete Selected"
        >
          <Trash2 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>
        <button
          onClick={onSave}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          title="Save Roadmap"
        >
          <Save className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>
        <button
          onClick={onLoad}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          title="Load Roadmap"
        >
          <Save className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>
        <button
          onClick={onToggleMiniMap}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          title={showMiniMap ? "Hide MiniMap" : "Show MiniMap"}
        >
          <Map className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>
      </div>
    </Panel>
  );
};
