"use client";
import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  NodeProps,
  Connection,
  Edge,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Plus, Save, Trash2, Code2, Brain, Map } from "lucide-react";

interface CustomNodeData {
  label: string;
  description: string;
  tag?: string;
  link?: string;
}

// Custom node types
const CustomNode = ({ data, selected }: NodeProps) => {
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

const nodeTypes = {
  custom: CustomNode,
};

// Initial nodes and edges for the example roadmap
const initialNodes: Node<CustomNodeData>[] = [
  {
    id: "1",
    type: "custom",
    position: { x: 250, y: 0 },
    data: {
      label: "HTML & CSS Fundamentals",
      description: "Learn the basics of web markup and styling",
      tag: "Frontend",
      link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 250, y: 150 },
    data: {
      label: "JavaScript Basics",
      description: "Master JavaScript fundamentals and ES6+ features",
      tag: "Frontend",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
  },
  {
    id: "3",
    type: "custom",
    position: { x: 250, y: 300 },
    data: {
      label: "React Fundamentals",
      description: "Learn React core concepts and hooks",
      tag: "Frontend",
      link: "https://react.dev/",
    },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
];

export default function Roadmap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node<CustomNodeData> | null>(
    null
  );
  const [showMiniMap, setShowMiniMap] = useState(true);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node<CustomNodeData>) => {
      setSelectedNode(node);
    },
    []
  );

  const addNewNode = useCallback(() => {
    const newNode: Node<CustomNodeData> = {
      id: `${nodes.length + 1}`,
      type: "custom",
      position: { x: 250, y: nodes.length * 150 },
      data: {
        label: "New Learning Step",
        description: "Add your description here",
        tag: "New",
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [nodes, setNodes]);

  const deleteSelectedNodes = useCallback(() => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            edge.source !== selectedNode.id && edge.target !== selectedNode.id
        )
      );
      setSelectedNode(null);
    }
  }, [selectedNode, setNodes, setEdges]);

  const saveRoadmap = useCallback(() => {
    const roadmapData = {
      nodes,
      edges,
    };
    localStorage.setItem("roadmap", JSON.stringify(roadmapData));
  }, [nodes, edges]);

  const loadRoadmap = useCallback(() => {
    const savedRoadmap = localStorage.getItem("roadmap");
    if (savedRoadmap) {
      const { nodes: savedNodes, edges: savedEdges } = JSON.parse(savedRoadmap);
      setNodes(savedNodes);
      setEdges(savedEdges);
    }
  }, [setNodes, setEdges]);

  return (
    <div className="h-[calc(100vh-3rem)] w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* ReactFlow Canvas */}
      <div className="h-full w-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 1.5, minZoom: 0.1, maxZoom: 2 }}
          defaultViewport={{ x: 0, y: 0, zoom: 0.55 }}
          minZoom={0.1}
          maxZoom={2}
          className="bg-transparent"
          proOptions={{ hideAttribution: true }}
        >
          <Background />
          <Controls />
          {showMiniMap && <MiniMap />}

          {/* Toolbar */}
          <Panel
            position="top-left"
            className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 p-2 shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <button
                onClick={addNewNode}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                title="Add Node"
              >
                <Plus className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              <button
                onClick={deleteSelectedNodes}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                title="Delete Selected"
              >
                <Trash2 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              <button
                onClick={saveRoadmap}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                title="Save Roadmap"
              >
                <Save className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              <button
                onClick={loadRoadmap}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                title="Load Roadmap"
              >
                <Save className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              <button
                onClick={() => setShowMiniMap(!showMiniMap)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                title={showMiniMap ? "Hide MiniMap" : "Show MiniMap"}
              >
                <Map className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
            </div>
          </Panel>

          {/* Node Editor Panel */}
          {selectedNode && (
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
                    value={selectedNode.data.label}
                    onChange={(e) =>
                      setNodes((nds) =>
                        nds.map((node) =>
                          node.id === selectedNode.id
                            ? {
                                ...node,
                                data: { ...node.data, label: e.target.value },
                              }
                            : node
                        )
                      )
                    }
                    className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Description
                  </label>
                  <textarea
                    value={selectedNode.data.description}
                    onChange={(e) =>
                      setNodes((nds) =>
                        nds.map((node) =>
                          node.id === selectedNode.id
                            ? {
                                ...node,
                                data: {
                                  ...node.data,
                                  description: e.target.value,
                                },
                              }
                            : node
                        )
                      )
                    }
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
                    value={selectedNode.data.tag}
                    onChange={(e) =>
                      setNodes((nds) =>
                        nds.map((node) =>
                          node.id === selectedNode.id
                            ? {
                                ...node,
                                data: { ...node.data, tag: e.target.value },
                              }
                            : node
                        )
                      )
                    }
                    className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Resource Link
                  </label>
                  <input
                    type="url"
                    value={selectedNode.data.link || ""}
                    onChange={(e) =>
                      setNodes((nds) =>
                        nds.map((node) =>
                          node.id === selectedNode.id
                            ? {
                                ...node,
                                data: { ...node.data, link: e.target.value },
                              }
                            : node
                        )
                      )
                    }
                    className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                    placeholder="https://..."
                  />
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            </Panel>
          )}

          {/* AI Assistant Panel */}
          {selectedNode && (
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
          )}
        </ReactFlow>
      </div>
    </div>
  );
}
