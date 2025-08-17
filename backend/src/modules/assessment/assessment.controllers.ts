import { Request, Response, NextFunction } from "express";
import { generatePromptFromAssessment } from "./assessment.services.js";
import { AssessmentInput } from "@shared/schemas/assessment.js";
// import { formatAIResponse } from "./assessment.services.js";
import { getGeminiAIResponse } from "./assessment.ai.js";
import { RoadmapService } from "@modules/roadmap/services/roadmap.service.js";
import {
  ReactFlowRoadmapSchema,
  RoadmapListSchema,
  type RoadmapList,
} from "@shared/schemas/roadmap.js";

export const generateAIPrompt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const assessment: AssessmentInput = req.body;
  const prompt = generatePromptFromAssessment(assessment);

  req.body.prompt = prompt;
  next();
};

export const aiController = async (req: Request, res: Response) => {
  // const assessment: Assessment = req.body;
  const prompt = req.body.prompt;
  const data = await getGeminiAIResponse(prompt);
  const assessmentId = `assessment_${Date.now()}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  try {
    const userId = req.session.user?.id;
    if (userId) {
      // If AI response includes a roadmap compatible with React Flow,
      // persist it for this user so the dashboard can load it later.
      const maybeRoadmap = (data && (data as any).roadmap) || null;
      if (maybeRoadmap && typeof maybeRoadmap === "object") {
        const reactFlowRoadmap = toReactFlowRoadmap(maybeRoadmap);
        await RoadmapService.saveRoadmap(userId, reactFlowRoadmap);
      }
    }
  } catch (err) {
    // Non-fatal: saving roadmap should not block returning assessment results
    console.error("Failed to save roadmap from assessment:", err);
  }

  res.json({
    success: true,
    assessmentId,
    data,
  });
};

// Ensure any roadmap-like payload is converted to React Flow schema
function toReactFlowRoadmap(raw: any) {
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
