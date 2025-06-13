"use client";
import { Panel } from "reactflow";
import { Node } from "reactflow";

interface CustomNodeData {
  label: string;
  description: string;
  tag?: string;
  link?: string;
}

interface NodeEditorProps {
  node: Node<CustomNodeData>;
  onUpdate: (nodeId: string, data: Partial<CustomNodeData>) => void;
  onClose: () => void;
}

export const NodeEditor = ({ node, onUpdate, onClose }: NodeEditorProps) => {
  return (
    <Panel
      position="top-right"
      className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-lg w-80"
    >
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900 dark:text-white">
          Edit Node
        </h3>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Title
          </label>
          <input
            type="text"
            value={node.data.label}
            onChange={(e) => onUpdate(node.id, { label: e.target.value })}
            className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Description
          </label>
          <textarea
            value={node.data.description}
            onChange={(e) => onUpdate(node.id, { description: e.target.value })}
            className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Tag
          </label>
          <input
            type="text"
            value={node.data.tag}
            onChange={(e) => onUpdate(node.id, { tag: e.target.value })}
            className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Resource Link
          </label>
          <input
            type="url"
            value={node.data.link || ""}
            onChange={(e) => onUpdate(node.id, { link: e.target.value })}
            className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
            placeholder="https://..."
          />
        </div>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Done
        </button>
      </div>
    </Panel>
  );
};
