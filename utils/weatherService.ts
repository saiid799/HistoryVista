// File: utils/weatherService.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { cleanJsonResponse } from "./cleanJson";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  description: string;
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function getCityWeather(cityName: string): Promise<{
  success: boolean;
  data?: WeatherData;
  error?: string;
}> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
      Generate realistic and accurate current weather data for ${cityName}.
      Consider the city's typical climate, season, and geographical location.
      
      Return a JSON object with these exact fields:
      {
        "temperature": number (in Celsius),
        "condition": string (e.g., "Sunny", "Cloudy", "Rainy"),
        "humidity": number (percentage),
        "windSpeed": number (in km/h),
        "description": string (brief weather description, max 20 words)
      }

      Make sure the data is realistic for the location and current season.
      IMPORTANT: Return ONLY the JSON object, no additional text.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      const cleanedJson = cleanJsonResponse(text);
      const data = JSON.parse(cleanedJson) as WeatherData;
      return { success: true, data };
    } catch (error) {
      console.error("Failed to parse weather data:", error);
      return {
        success: false,
        error: "Failed to process weather data",
      };
    }
  } catch (error) {
    console.error("Weather API error:", error);
    return {
      success: false,
      error: "Failed to fetch weather data",
    };
  }
}
