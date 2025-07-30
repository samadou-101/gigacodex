import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";
export async function getGeminiAIResponse(prompt: string) {
  const ai = new GoogleGenAI({});
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    // contents: prompt,
    contents: prompt,
  });
  return response;
}
