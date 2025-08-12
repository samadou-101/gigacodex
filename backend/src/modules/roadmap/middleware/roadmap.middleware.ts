import { Request, Response, NextFunction } from "express";
import { z } from "zod";

// Accept React Flow style roadmap payload { nodes: [...], edges: [...] }
const RoadmapFlowSchema = z.object({
  nodes: z.array(z.unknown()),
  edges: z.array(z.unknown()),
});

export const validateRoadmapData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roadmapData = RoadmapFlowSchema.parse(req.body);
    req.body = roadmapData;
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
      return;
    }
  }
};
