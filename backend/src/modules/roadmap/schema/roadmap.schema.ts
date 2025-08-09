import { z } from "zod";

export const RoadmapItem = z.object({
  title: z.string(),
  description: z.string(),
  durationEstimate: z.number().int().nonnegative(),
});

export const RoadmapSchema = z.array(RoadmapItem);

// Example usage:
export type RoadmapItemType = z.infer<typeof RoadmapItem>;
export type RoadmapType = z.infer<typeof RoadmapSchema>;
