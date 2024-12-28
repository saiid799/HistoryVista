// File: utils/gemini.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { cleanJsonResponse } from "./cleanJson";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function getCityHistory(cityName: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

    const prompt = `
    Generate a detailed historical timeline for ${cityName}. Include:
    1. A brief summary of the city's significance (max 150 words)
    2. 6-8 major historical events in chronological order
    3. The geographical coordinates of the city center

    The response must be in JSON format with these exact fields:
    {
      "name": "${cityName}",
      "summary": "Brief summary...",
      "events": [
        { "year": YYYY, "description": "Event description" }
      ],
      "coordinates": { "lat": XX.XXXX, "lng": YY.YYYY }
    }

    Keep event descriptions concise (max 50 words each). Make sure all events are factually accurate and significant to the city's history.
    
    IMPORTANT: Return ONLY the JSON object with no markdown formatting or code block markers.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      // Clean the response before parsing
      const cleanedJson = cleanJsonResponse(text);
      const data = JSON.parse(cleanedJson);
      return { success: true, data };
    } catch (error) {
      console.error("Failed to parse Gemini response:", error);
      console.error("Raw response:", text);
      return {
        success: false,
        error: "Failed to process city data",
      };
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    return {
      success: false,
      error: "Failed to fetch city history",
    };
  }
}
