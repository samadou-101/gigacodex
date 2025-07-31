import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI, Type } from "@google/genai";
// export async function getGeminiAIResponse(prompt: string) {
//   const ai = new GoogleGenAI({});
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     // contents: prompt,
//     contents: prompt,
//   });
//   return response;
// }

const ai = new GoogleGenAI({});

export async function getGeminiAIResponse(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          insights: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: {
                  type: Type.STRING,
                },
                content: {
                  type: Type.STRING,
                },
              },
              required: ["title", "content"],
            },
          },
          roadmap: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: {
                  type: Type.STRING,
                },
                description: {
                  type: Type.STRING,
                },
                durationEstimate: {
                  type: Type.NUMBER,
                },
              },
              required: ["title", "description", "durationEstimate"],
            },
          },
        },
        required: ["insights", "roadmap"],
      },
    },
  });

  const rawJsonString = response?.text;

  // 2. Parse the string into a JavaScript object
  try {
    const structuredData = JSON.parse(rawJsonString!);
    return structuredData;
  } catch (error) {
    console.error("Error parsing the AI's JSON output:", error);
  }
}
