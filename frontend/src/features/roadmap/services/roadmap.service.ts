import apiClient from "@/features/assessment/services/api-client";
import type { Edge, Node } from "reactflow";

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
    const response = await apiClient.post("/api/roadmap/save", data);
    return { success: true, roadmap: response.data.roadmap };
  }

  static async loadRoadmap<CustomNodeData = unknown>(): Promise<
    RoadmapResponse<CustomNodeData>
  > {
    const response = await apiClient.get("/api/roadmap/load");
    return { success: true, roadmap: response.data.roadmap };
  }
}
