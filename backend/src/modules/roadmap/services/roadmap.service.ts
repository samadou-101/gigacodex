import { DatabaseError } from "@/shared/errors/AppError.js";
import type { ReactFlowRoadmap } from "@shared/schemas/roadmap.js";
import prisma from "@/config/db.config.js";
// import { BadRequestError } from "@shared/errors/AppError.js";

export class RoadmapService {
  static async saveRoadmap(userId: number, roadmapData: ReactFlowRoadmap) {
    const result = prisma.roadmap.upsert({
      where: { userId },
      update: { roadmap_data: roadmapData },
      create: { userId, roadmap_data: roadmapData },
    });
    return result;
  }

  static async loadRoadmap(userId: number): Promise<ReactFlowRoadmap> {
    console.log("userId is: ", userId);
    try {
      const roadmap = await prisma.roadmap.findUnique({
        where: { userId: userId },
        select: { roadmap_data: true },
      });
      if (!roadmap) {
        // Return an empty roadmap shape compatible with React Flow
        return { nodes: [], edges: [] } as ReactFlowRoadmap;
      }
      return roadmap.roadmap_data as ReactFlowRoadmap;
    } catch (error) {
      throw new DatabaseError("Failed to fetch roadmap");
    }
  }
}
