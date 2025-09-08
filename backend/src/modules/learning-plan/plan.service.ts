import { ai } from "@/config/ai.config.js";
import { RoadmapType } from "../roadmap/schema/roadmap.schema.js";
import { Type } from "@google/genai";

const planPrompt = (roadmap: RoadmapType) => {
  const roadmapSummary = roadmap
    .map((item, index) => `${index + 1}. ${item.title} - ${item.description}`)
    .join("\n");

  const prompt = `
You are an expert in creating detailed learning plans. Based on the following roadmap, generate a comprehensive plan.

### Roadmap:
${roadmapSummary}

### Requirements for the plan:
- For each roadmap item:
  - Use its title as "nodeTitle"
  - Use its description for "description"
  - Generate a list of "concepts" (3-6 concepts per node), each with:
    - "name" (concept title)
    - "subTopics" (1 to 5 detailed subtopics)
  - Include "whyImportant" for each node

Keep the plan practical, focused on guiding a beginner or intermediate learner, and avoid resource links or time estimates.
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
                concepts: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: {
                        type: Type.STRING,
                      },
                      subTopics: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.STRING,
                        },
                      },
                    },
                    required: ["name", "subTopics"],
                  },
                },
                whyImportant: {
                  type: Type.STRING,
                },
              },
              required: [
                "nodeTitle",
                "description",
                "concepts",
                "whyImportant",
              ],
            },
          },
        },
        required: ["plan"],
      },
    },
  });
  return response.text;
};

export const savePlanToDB = async () => {};
