/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "@/lib/api-client";
import type { Edge, Node } from "reactflow";
import { normalizeRoadmapPayload } from "./transform";
import type { ReactFlowRoadmap } from "@shared/schemas/roadmap";

export interface RoadmapPayload<CustomNodeData = unknown> {
  nodes: Node<CustomNodeData>[];
  edges: Edge[];
}

export interface RoadmapResponse<CustomNodeData = unknown> {
  success: boolean;
  roadmap?: RoadmapPayload<CustomNodeData>;
  message?: string;
}

export class RoadmapService {
  static async saveRoadmap<CustomNodeData = unknown>(
    data: RoadmapPayload<CustomNodeData>
  ): Promise<RoadmapResponse<CustomNodeData>> {
    await apiClient.post("/api/roadmap/save", data);
    return {
      success: true,
      // roadmap: normalizeRoadmapPayload(
      //   response.data.roadmap
      // ) as ReactFlowRoadmap,
    } as any;
  }

  static async loadRoadmap<CustomNodeData = unknown>(): Promise<
    RoadmapResponse<CustomNodeData>
  > {
    const response = await apiClient.get("/api/roadmap/load");
    return {
      success: true,
      roadmap: normalizeRoadmapPayload(
        response.data.roadmap
      ) as ReactFlowRoadmap,
    } as any;
  }
}
