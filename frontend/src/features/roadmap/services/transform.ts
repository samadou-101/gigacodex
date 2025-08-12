/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Edge, Node } from "reactflow";
import type { ReactFlowRoadmap } from "@shared/schemas/roadmap";

export interface CustomNodeData {
  label: string;
  description: string;
  tag?: string;
  link?: string;
  number?: number;
}

export function isReactFlowRoadmap(value: unknown): value is ReactFlowRoadmap {
  return (
    !!value &&
    typeof value === "object" &&
    Array.isArray((value as any).nodes) &&
    Array.isArray((value as any).edges)
  );
}

export function convertPhasesToReactFlow(phases: Array<any>): ReactFlowRoadmap {
  const nodes: Node<CustomNodeData>[] = phases.map((phase, index) => {
    const id = String(index + 1);
    const topics: string[] = Array.isArray(phase.topics) ? phase.topics : [];
    const description = topics.length > 0 ? topics.join(", ") : "";
    return {
      id,
      type: "custom",
      position: { x: 250, y: index * 150 },
      data: {
        label: phase.title ?? `Phase ${index + 1}`,
        description,
        tag: phase.duration ?? undefined,
      },
    } as Node<CustomNodeData>;
  });

  const edges: Edge[] = nodes.slice(0, -1).map((node, idx) => ({
    id: `e${node.id}-${nodes[idx + 1].id}`,
    source: String(node.id),
    target: String(nodes[idx + 1].id),
    animated: true,
    type: "custom",
  }));

  return { nodes, edges };
}

export function normalizeRoadmapPayload(raw: any): ReactFlowRoadmap {
  if (!raw) return { nodes: [], edges: [] };
  // Already in ReactFlow shape
  if (isReactFlowRoadmap(raw)) return raw;
  // AI response shape
  if (Array.isArray(raw.phases)) return convertPhasesToReactFlow(raw.phases);
  // Unknown shape fallback
  return { nodes: [], edges: [] };
}
