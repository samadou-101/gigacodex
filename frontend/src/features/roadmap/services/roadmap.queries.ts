/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Edge, Node } from "reactflow";
import { RoadmapService, type RoadmapPayload } from "./roadmap.service";

const ROADMAP_QUERY_KEY = ["roadmap"] as const;

export function useLoadRoadmapQuery<CustomNodeData = any>() {
  return useQuery({
    queryKey: ROADMAP_QUERY_KEY,
    queryFn: async () => {
      const res = await RoadmapService.loadRoadmap<CustomNodeData>();
      if (!res.success || !res.roadmap)
        return { nodes: [] as Node<CustomNodeData>[], edges: [] as Edge[] };
      return res.roadmap;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useSaveRoadmapMutation<CustomNodeData = any>() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: RoadmapPayload<CustomNodeData>) => {
      const res = await RoadmapService.saveRoadmap(payload);
      if (!res.success)
        throw new Error(res.message || "Failed to save roadmap");
      return res.roadmap;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(ROADMAP_QUERY_KEY, data ?? null);
    },
  });
}
