import { RoadmapType } from "../schema/roadmap.schema.js";
import prisma from "@/config/db.config.js";

export class RoadmapService {
  static async saveRoadmap(userId: number, roadmapData: RoadmapType) {
    const result = prisma.roadmap.upsert({
      where: { userId },
      update: { roadmap_data: roadmapData },
      create: { userId, roadmap_data: roadmapData },
    });
    return result;
  }
  static async laodRoadmap() {}
}
