import { ai } from "@/config/ai.config.js";
import { RoadmapType } from "../roadmap/schema/roadmap.schema.js";
import { Type } from "@google/genai";
import { LearningPlanType } from "./plan.schema.js";
import prisma from "@/config/db.config.js";
import { redis } from "@/config/redis.config.js";

const planPrompt = (roadmap: RoadmapType) => {
  const roadmapSummary = roadmap
    .map((item, index) => `${index + 1}. ${item.title} - ${item.description}`)
    .join("\n");

  const prompt = `
You are an expert in creating structured learning plans. Based on the following roadmap, generate a practical learning plan.

### Roadmap:
${roadmapSummary}

### Requirements:
- For each roadmap item:
  - Use its title as "nodeTitle"
  - Use its description as "description"
  - Generate a list of "topics" (the essential skills or concepts for that stage)
  - Include "whyImportant" (1-2 sentences explaining its importance)
- Do NOT include subtopics, resources, or time estimates.
- Keep the topics focused and actionable, avoid vague terms.
- Ensure every roadmap item has all required fields.

`;
  return prompt;
};

export const generatePlan = async (roadmap: RoadmapType) => {
  const prompt = planPrompt(roadmap);
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          plan: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                nodeTitle: {
                  type: Type.STRING,
                },
                description: {
                  type: Type.STRING,
                },
                topics: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.STRING,
                  },
                },
                whyImportant: {
                  type: Type.STRING,
                },
              },
              required: ["nodeTitle", "description", "topics", "whyImportant"],
            },
          },
        },
        required: ["plan"],
      },
    },
  });
  return response.text;
};

export const savePlanToDB = async (
  userId: number,
  planData: LearningPlanType
) => {
  try {
    const result = await prisma.learningPlan.upsert({
      where: { userId },
      update: { learningPlan_data: planData },
      create: { userId, learningPlan_data: planData },
    });
    return result;
  } catch (error) {
    throw new Error("error when updating or creating the learningp plan");
  }
};

export const savePlanToCache = async (
  userId: number,
  planData: LearningPlanType
) => {
  try {
    await redis.set(`learningPlan:${userId}`, JSON.stringify(planData));
    console.log(`Plan cached for user ${userId}`);
  } catch (error) {
    console.error("Error saving plan to Redis:", error);
  }
};

export const loadPlanFromDB = async (userId: number) => {
  try {
    const result = await prisma.learningPlan.findUnique({ where: { userId } });
    return result;
  } catch (error: any) {
    throw new Error("Retrieving Plan from DB failed", error);
  }
};

export const loadPlanFromCache = async (userId: number) => {
  try {
    const result = await redis.get(`learningPlan:${userId}`);
    return result;
  } catch (error: any) {
    throw new Error("Retrieving Plan from Redis failed", error);
  }
};
