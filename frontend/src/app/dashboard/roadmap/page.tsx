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
import {
  useLoadRoadmapQuery,
  useSaveRoadmapMutation,
} from "@/features/roadmap/services/roadmap.queries";
import { CustomNode } from "./components/CustomNode";
import { normalizeRoadmapPayload } from "@/features/roadmap/services/transform";
import { CustomEdge } from "./components/CustomEdge";
import { Toolbar } from "./components/Toolbar";
import { NodeEditor } from "./components/NodeEditor";
import { AIAssistant } from "./components/AIAssistant";
import {
  assignNodeNumbers,
  sanitizeEdges,
  sanitizeNodes,
} from "@/features/roadmap/utils";
import type { CustomNodeData } from "@/features/roadmap/types";

// Move these outside the component
const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

export default function Roadmap() {
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node<CustomNodeData> | null>(
    null
  );
  const [showMiniMap, setShowMiniMap] = useState(true);
  const [activeAction, setActiveAction] = useState<"edit" | "ai" | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success">("idle");
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { data: loadedRoadmap, refetch: refetchRoadmap } =
    useLoadRoadmapQuery<CustomNodeData>();
  const { mutate: saveRoadmapMutation, isSuccess: isSaveSuccess } =
    useSaveRoadmapMutation<CustomNodeData>();

  useEffect(() => {
    if (!loadedRoadmap) return;
    const normalized = normalizeRoadmapPayload(loadedRoadmap);
    const sanitizedNodes = sanitizeNodes(normalized.nodes);
    const sanitizedEdges = sanitizeEdges(normalized.edges);
    const numberedNodes = assignNodeNumbers(sanitizedNodes, sanitizedEdges);
    setNodes(numberedNodes);
    setEdges(sanitizedEdges);
  }, [loadedRoadmap, setNodes, setEdges]);

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
    const roadmapData = { nodes, edges };
    saveRoadmapMutation(roadmapData);
  }, [nodes, edges, saveRoadmapMutation]);

  useEffect(() => {
    if (isSaveSuccess) {
      setSaveStatus("success");
      const timeout = setTimeout(() => setSaveStatus("idle"), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isSaveSuccess]);

  const loadRoadmap = useCallback(() => {
    void refetchRoadmap();
  }, [refetchRoadmap]);

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
          onInit={(reactFlowInstance) => {
            reactFlowInstance.fitView({ padding: 0.2 });

            setTimeout(() => {
              const v = reactFlowInstance.getViewport();

              // Move content down visually by shifting viewport up
              const topPadding = 100; // pixels to leave at top
              reactFlowInstance.setViewport({
                x: v.x,
                y: v.y + topPadding / v.zoom, // adjust for zoom level
                zoom: v.zoom * 1, // keep same zoom
              });
            }, 50);
          }}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeClick={onEdgeClick}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          // fitView
          fitViewOptions={{ padding: 1.5, minZoom: 0.1, maxZoom: 2 }}
          // defaultViewport={{ x: 0, y: 0, zoom: 0.55 }}
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
