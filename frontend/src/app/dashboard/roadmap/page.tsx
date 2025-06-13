"use client";
import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CustomNode } from "./components/CustomNode";
import { Toolbar } from "./components/Toolbar";
import { NodeEditor } from "./components/NodeEditor";
import { AIAssistant } from "./components/AIAssistant";

interface CustomNodeData {
  label: string;
  description: string;
  tag?: string;
  link?: string;
}

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

  const updateNode = useCallback(
    (nodeId: string, data: Partial<CustomNodeData>) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                data: { ...node.data, ...data },
              }
            : node
        )
      );
    },
    [setNodes]
  );

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

          <Toolbar
            onAddNode={addNewNode}
            onDeleteSelected={deleteSelectedNodes}
            onSave={saveRoadmap}
            onLoad={loadRoadmap}
            showMiniMap={showMiniMap}
            onToggleMiniMap={() => setShowMiniMap(!showMiniMap)}
          />

          {selectedNode && (
            <NodeEditor
              node={selectedNode}
              onUpdate={updateNode}
              onClose={() => setSelectedNode(null)}
            />
          )}

          {selectedNode && <AIAssistant />}
        </ReactFlow>
      </div>
    </div>
  );
}
