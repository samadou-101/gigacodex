import { BadRequestError, DatabaseError } from "@/shared/errors/AppError.js";
import { RoadmapType } from "../schema/roadmap.schema.js";
import prisma from "@/config/db.config.js";
// import { BadRequestError } from "@shared/errors/AppError.js";

export class RoadmapService {
  static async saveRoadmap(userId: number, roadmapData: RoadmapType) {
    const result = prisma.roadmap.upsert({
      where: { userId },
      update: { roadmap_data: roadmapData },
      create: { userId, roadmap_data: roadmapData },
    });
    return result;
  }

  static async loadRoadmap(userId: number): Promise<RoadmapType> {
    try {
      const roadmap = await prisma.roadmap.findUnique({
        where: { id: userId },
        select: { roadmap_data: true },
      });
      if (!roadmap) {
        throw new BadRequestError();
      }
      return roadmap.roadmap_data as RoadmapType;
    } catch (error) {
      throw new DatabaseError("Failed to fetch roadmap");
    }
  }
}
