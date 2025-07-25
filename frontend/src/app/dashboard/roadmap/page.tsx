"use client";
import { useCallback, useRef, useState, useEffect } from "react";
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
import { CustomEdge } from "./components/CustomEdge";
import { Toolbar } from "./components/Toolbar";
import { NodeEditor } from "./components/NodeEditor";
import { AIAssistant } from "./components/AIAssistant";

interface CustomNodeData {
  label: string;
  description: string;
  tag?: string;
  link?: string;
  number?: number;
}

// Move these outside the component
const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

// Initial nodes and edges for the example roadmap
const initialNodes: Node<CustomNodeData>[] = [
  {
    id: "1",
    type: "custom",
    position: { x: 250, y: 0 },
    data: {
      label: "HTML & CSS Fundamentals",
      description:
        "Learn the basics of web markup and styling. Understand HTML structure, semantic elements, and CSS properties. Master layout techniques including Flexbox and Grid. Practice responsive design principles and learn to create beautiful, accessible web pages.",
    },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 250, y: 150 },
    data: {
      label: "JavaScript Basics",
      description:
        "Master JavaScript fundamentals and ES6+ features. Learn variables, data types, functions, and control flow. Understand objects, arrays, and their methods. Practice DOM manipulation and event handling. Explore modern JavaScript features like arrow functions, destructuring, and async/await.",
    },
  },
  {
    id: "3",
    type: "custom",
    position: { x: 250, y: 300 },
    data: {
      label: "React Fundamentals",
      description:
        "Learn React core concepts and hooks. Understand components, props, and state management. Master React hooks like useState, useEffect, and useContext. Practice building interactive UIs and handling forms. Learn about React Router for navigation and state management patterns.",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    type: "custom",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
    type: "custom",
  },
];

// Helper function to assign numbers to nodes based on their connections
const assignNodeNumbers = (nodes: Node<CustomNodeData>[], edges: Edge[]) => {
  // Find root nodes (nodes with no incoming edges)
  const rootNodes = nodes.filter(
    (node) => !edges.some((edge) => edge.target === node.id)
  );

  // Create a map to store node numbers
  const nodeNumbers = new Map<string, number>();
  let currentNumber = 1;

  // Function to recursively assign numbers
  const assignNumber = (nodeId: string) => {
    if (!nodeNumbers.has(nodeId)) {
      nodeNumbers.set(nodeId, currentNumber++);

      // Find all outgoing edges
      const outgoingEdges = edges.filter((edge) => edge.source === nodeId);

      // Recursively assign numbers to connected nodes
      outgoingEdges.forEach((edge) => {
        assignNumber(edge.target);
      });
    }
  };

  // Start numbering from root nodes
  rootNodes.forEach((node) => assignNumber(node.id));

  // Update nodes with their numbers
  return nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      number: nodeNumbers.get(node.id),
    },
  }));
};

// Utility to ensure loaded nodes are valid
function sanitizeNodes(nodes: Node<CustomNodeData>[]) {
  return (nodes || []).map((node) => ({
    id: node.id || String(Math.random()),
    type: node.type || "custom",
    position: node.position || { x: 0, y: 0 },
    data: {
      label: node.data?.label || "Untitled",
      description: node.data?.description || "",
      tag: node.data?.tag || "",
      link: node.data?.link || "",
      // number will be assigned by assignNodeNumbers
    },
  }));
}

function sanitizeEdges(edges: Edge[]) {
  return (edges || []).map((edge) => ({
    id: edge.id || `e${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
    animated: edge.animated ?? true,
    type: edge.type || "custom",
  }));
}

export default function Roadmap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node<CustomNodeData> | null>(
    null
  );
  const [showMiniMap, setShowMiniMap] = useState(true);
  const [activeAction, setActiveAction] = useState<"edit" | "ai" | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success">("idle");
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  // Update node numbers whenever nodes or edges change
  // useEffect(() => {
  //   setNodes((nds) => assignNodeNumbers(nds, edges));
  // }, [edges, setNodes]);
  useEffect(() => {
    loadRoadmap();
  }, []);

  const onConnect = useCallback(
    (params: Connection) => {
      // Check if the connection already exists
      const connectionExists = edges.some(
        (edge) => edge.source === params.source && edge.target === params.target
      );

      if (!connectionExists) {
        setEdges((eds) =>
          addEdge({ ...params, animated: true, type: "custom" }, eds)
        );
      }
    },
    [edges, setEdges]
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node<CustomNodeData>) => {
      // Check if the click was on one of the action buttons
      const target = event.target as HTMLElement;
      const button = target.closest("button");

      if (button) {
        const action = button.getAttribute("data-action");
        if (action === "edit") {
          setSelectedNode(node);
          setActiveAction("edit");
        } else if (action === "ai") {
          setSelectedNode(node);
          setActiveAction("ai");
        }
      }
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
      setActiveAction(null);
    }
  }, [selectedNode, setNodes, setEdges]);

  const saveRoadmap = useCallback(() => {
    const roadmapData = {
      nodes,
      edges,
    };
    localStorage.setItem("roadmap", JSON.stringify(roadmapData));
    setSaveStatus("success");
  }, [nodes, edges]);

  useEffect(() => {
    if (saveStatus === "success") {
      const timeout = setTimeout(() => setSaveStatus("idle"), 2000);
      return () => clearTimeout(timeout);
    }
  }, [saveStatus]);

  const loadRoadmap = useCallback(() => {
    const savedRoadmap = localStorage.getItem("roadmap");
    if (savedRoadmap) {
      const { nodes: savedNodes, edges: savedEdges } = JSON.parse(savedRoadmap);
      const sanitizedNodes = sanitizeNodes(savedNodes);
      const sanitizedEdges = sanitizeEdges(savedEdges);
      const numberedNodes = assignNodeNumbers(sanitizedNodes, sanitizedEdges);
      setNodes(numberedNodes);
      setEdges(sanitizedEdges);
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

  const addNodeBetween = useCallback(
    (sourceNode: Node<CustomNodeData>, targetNode: Node<CustomNodeData>) => {
      // Calculate position between source and target nodes
      const sourceY = sourceNode.position.y;
      const targetY = targetNode.position.y;
      const newY = sourceY + (targetY - sourceY) / 2;

      // Create new node
      const newNode: Node<CustomNodeData> = {
        id: `${nodes.length + 1}`,
        type: "custom",
        position: { x: sourceNode.position.x, y: newY },
        data: {
          label: "New Learning Step",
          description: "Add your description here",
          tag: "New",
        },
      };

      // Add new node
      setNodes((nds) => [...nds, newNode]);

      // Remove old connection
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            !(edge.source === sourceNode.id && edge.target === targetNode.id)
        )
      );

      // Add new connections
      setEdges((eds) => [
        ...eds,
        {
          id: `e${sourceNode.id}-${newNode.id}`,
          source: sourceNode.id,
          target: newNode.id,
          animated: true,
          type: "custom",
        },
        {
          id: `e${newNode.id}-${targetNode.id}`,
          source: newNode.id,
          target: targetNode.id,
          animated: true,
          type: "custom",
        },
      ]);
    },
    [nodes, setNodes, setEdges]
  );

  const onEdgeClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      const sourceNode = nodes.find((node) => node.id === edge.source);
      const targetNode = nodes.find((node) => node.id === edge.target);

      if (sourceNode && targetNode) {
        addNodeBetween(
          sourceNode as Node<CustomNodeData>,
          targetNode as Node<CustomNodeData>
        );
      }
    },
    [nodes, addNodeBetween]
  );

  const closeAction = useCallback(() => {
    setSelectedNode(null);
    setActiveAction(null);
  }, []);

  return (
    <div className="h-[calc(100vh-3rem)] w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">
      {/* Save Feedback Banner */}
      {saveStatus === "success" && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-2 rounded-b-xl shadow-lg animate-fade-in">
          Roadmap saved!
        </div>
      )}
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
          onEdgeClick={onEdgeClick}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          fitViewOptions={{ padding: 1.5, minZoom: 0.1, maxZoom: 2 }}
          defaultViewport={{ x: 0, y: 0, zoom: 0.55 }}
          minZoom={0.1}
          maxZoom={2}
          className="bg-transparent"
          proOptions={{ hideAttribution: true }}
        >
          <Background />
          <Controls
            className="[&>button]:!bg-white/90 dark:[&>button]:!bg-slate-800 [&>button]:!backdrop-blur-sm [&>button]:!border [&>button]:!border-slate-200 dark:[&>button]:!border-slate-700 [&>button]:!rounded-lg [&>button]:!p-2 [&>button]:!shadow-lg [&>button]:!text-slate-600 dark:[&>button]:!text-white [&>button]:hover:!bg-blue-50 dark:[&>button]:hover:!bg-slate-700 [&>button]:hover:!border-blue-200 dark:[&>button]:hover:!border-slate-600 [&>button]:hover:!text-blue-600 dark:[&>button]:hover:!text-blue-400 [&>button]:!transition-all [&>button]:!duration-200 [&>button]:!m-1"
            showInteractive={false}
          />
          {showMiniMap && (
            <MiniMap
              className="!bg-white/80 dark:!bg-slate-800/80 !backdrop-blur-sm !border !border-slate-200 dark:!border-slate-700 !rounded-lg !p-1 !shadow-lg"
              nodeColor={(node) => {
                switch (node.type) {
                  case "input":
                    return "#60A5FA";
                  case "output":
                    return "#F472B6";
                  default:
                    return "#94A3B8";
                }
              }}
              maskColor="rgba(0, 0, 0, 0.1)"
              style={{
                backgroundColor: "transparent",
                borderRadius: "0.5rem",
              }}
              zoomable
              pannable
            />
          )}
          <Toolbar
            onAddNode={addNewNode}
            onDeleteSelected={deleteSelectedNodes}
            onSave={saveRoadmap}
            onLoad={loadRoadmap}
            showMiniMap={showMiniMap}
            onToggleMiniMap={() => setShowMiniMap(!showMiniMap)}
          />
          {selectedNode && activeAction === "edit" && (
            <NodeEditor
              node={selectedNode}
              onUpdate={updateNode}
              onClose={closeAction}
            />
          )}
          {selectedNode && activeAction === "ai" && (
            <AIAssistant onClose={closeAction} />
          )}
        </ReactFlow>
      </div>
    </div>
  );
}
