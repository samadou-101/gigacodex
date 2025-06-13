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

export default function Roadmap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node<CustomNodeData> | null>(
    null
  );
  const [showMiniMap, setShowMiniMap] = useState(true);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  // Update node numbers whenever nodes or edges change
  useEffect(() => {
    setNodes((nds) => assignNodeNumbers(nds, edges));
  }, [edges, setNodes]);

  const onConnect = useCallback(
    (params: Connection) => {
      // Check if the connection already exists
      const connectionExists = edges.some(
        (edge) => edge.source === params.source && edge.target === params.target
      );

      if (!connectionExists) {
        setEdges((eds) => addEdge({ ...params, animated: true }, eds));
      }
    },
    [edges, setEdges]
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
        },
        {
          id: `e${newNode.id}-${targetNode.id}`,
          source: newNode.id,
          target: targetNode.id,
          animated: true,
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
          onEdgeClick={onEdgeClick}
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
