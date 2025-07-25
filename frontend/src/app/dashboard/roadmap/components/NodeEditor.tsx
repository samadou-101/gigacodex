"use client";
import { Panel } from "reactflow";
import { Node } from "reactflow";
import { useState, useEffect } from "react";

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
  const [label, setLabel] = useState(node.data.label);
  const [description, setDescription] = useState(node.data.description);
  const [tag, setTag] = useState(node.data.tag || "");
  const [link, setLink] = useState(node.data.link || "");

  useEffect(() => {
    setLabel(node.data.label);
    setDescription(node.data.description);
    setTag(node.data.tag || "");
    setLink(node.data.link || "");
  }, [node]);

  const handleDone = () => {
    onUpdate(node.id, { label, description, tag, link });
    onClose();
  };

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
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Resource Link
          </label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
            placeholder="https://..."
          />
        </div>
        <button
          onClick={handleDone}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Done
        </button>
      </div>
    </Panel>
  );
};
