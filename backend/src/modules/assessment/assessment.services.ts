import { AssessmentInput } from "@shared/schemas/assessment.js";
import { getRoadmapPrompt } from "../ai/generation/roadmap/index.js";
import {
  ReactFlowRoadmapSchema,
  RoadmapList,
  RoadmapListSchema,
} from "@shared/schemas/roadmap.js";

export function generatePromptFromAssessment(
  assessment: AssessmentInput
): string {
  const roadmapPrompt: string = getRoadmapPrompt(assessment);
  return roadmapPrompt;
}

export function formatAIResponse(rawText: string | undefined) {
  if (!rawText) return {};

  const [insightsRaw, roadmapRaw] = rawText.split("roadmap:");
  const insightsList = insightsRaw
    .replace(/^insights:\s*/i, "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.replace(/^\*+\s*/, ""));

  const insights: Record<string, string> = {};
  insightsList.forEach((text, index) => {
    insights[`${index + 1}`] = text.replace(/^\d+\.\s*/, ""); // Remove leading numbering like "1. "
  });

  let roadmap = [];

  try {
    const roadmapJson =
      roadmapRaw.match(/```json([\s\S]*?)```/)?.[1]?.trim() ??
      roadmapRaw.trim();

    if (roadmapJson) {
      roadmap = JSON.parse(roadmapJson);
    }
  } catch (e) {
    console.error("Failed to parse roadmap JSON:", e);
  }

  return { insights, roadmap };
}

export function toReactFlowRoadmap(raw: any) {
  // Already correct shape
  if (raw && Array.isArray(raw.nodes) && Array.isArray(raw.edges)) {
    // Validate and coerce minimal fields
    return ReactFlowRoadmapSchema.parse(raw);
  }

  // AI list shape: [{ title, description, durationEstimate }]
  const parsedList = RoadmapListSchema.safeParse(raw);
  if (parsedList.success) {
    const list: RoadmapList = parsedList.data;
    const nodes = list.map((item, index) => ({
      id: String(index + 1),
      type: "custom",
      position: { x: 250, y: index * 150 },
      data: {
        label: item.title,
        description: item.description,
        tag: `${item.durationEstimate} days`,
      },
    }));
    const edges = nodes.slice(0, -1).map((node, idx) => ({
      id: `e${node.id}-${nodes[idx + 1].id}`,
      source: node.id,
      target: nodes[idx + 1].id,
      animated: true,
      type: "custom",
    }));
    return ReactFlowRoadmapSchema.parse({ nodes, edges });
  }

  // Fallback empty roadmap
  return { nodes: [], edges: [] };
}
