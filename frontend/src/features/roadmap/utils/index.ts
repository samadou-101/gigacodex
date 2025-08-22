import { Edge, Node } from "reactflow";
import { CustomNodeData } from "../services/transform";

export const assignNodeNumbers = (
  nodes: Node<CustomNodeData>[],
  edges: Edge[]
) => {
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

export function sanitizeNodes(nodes: Node<CustomNodeData>[]) {
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

export function sanitizeEdges(edges: Edge[]) {
  return (edges || []).map((edge) => ({
    id: edge.id || `e${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
    animated: edge.animated ?? true,
    type: edge.type || "custom",
  }));
}
