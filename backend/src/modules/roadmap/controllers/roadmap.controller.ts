import { Request, Response } from "express";
import { RoadmapType } from "../schema/roadmap.schema.js";
import { RoadmapService } from "../services/roadmap.service.js";

export const roadmapSavingController = async (req: Request, res: Response) => {
  try {
    const roadmapData: RoadmapType = req.body;
    const userId = req.session.user?.id;

    if (!userId) {
      res.status(400).json({ message: "Invalid Request!" });
      return;
    } else {
      const savedRoadmap = await RoadmapService.saveRoadmap(
        userId,
        roadmapData
      );

      res.status(200).json({ message: "saved roadmap!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Unexpected Error!" });
  }
};
