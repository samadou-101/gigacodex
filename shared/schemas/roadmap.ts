import { z } from "zod";

export const RoadmapNodeDataSchema = z.object({
  label: z.string(),
  description: z.string(),
  tag: z.string().optional(),
  link: z.string().optional(),
  number: z.number().optional(),
});

export const RoadmapNodeSchema = z.object({
  id: z.string(),
  type: z.string().optional(),
  position: z.object({ x: z.number(), y: z.number() }),
  data: RoadmapNodeDataSchema,
});

export const RoadmapEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  animated: z.boolean().optional(),
  type: z.string().optional(),
});

export const ReactFlowRoadmapSchema = z.object({
  nodes: z.array(RoadmapNodeSchema),
  edges: z.array(RoadmapEdgeSchema),
});

export type RoadmapNodeData = z.infer<typeof RoadmapNodeDataSchema>;
export type RoadmapNode = z.infer<typeof RoadmapNodeSchema>;
export type RoadmapEdge = z.infer<typeof RoadmapEdgeSchema>;
export type ReactFlowRoadmap = z.infer<typeof ReactFlowRoadmapSchema>;

// Server-side roadmap list (AI output) schema
export const RoadmapListItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  durationEstimate: z.number(),
});

export const RoadmapListSchema = z.array(RoadmapListItemSchema);

export type RoadmapListItem = z.infer<typeof RoadmapListItemSchema>;
export type RoadmapList = z.infer<typeof RoadmapListSchema>;
