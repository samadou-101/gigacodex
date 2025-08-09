import { Request, Response, NextFunction } from "express";
import { RoadmapSchema } from "../schema/roadmap.schema.js";

export const validateRoadmapData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roadmapData = RoadmapSchema.parse(req.body);
    req.body = roadmapData;
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
      return;
    }
  }
};
