// main.js
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main(prompt) {
  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }], // ✅ correct structure
  });

  console.log(JSON.stringify(result, null, 2));
  // ✅ Safe parsing from Gemini's nested response
  const text = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text || typeof text !== "string") {
    throw new Error("AI returned empty or invalid content.");
  }

  return text;
}

export default main;
