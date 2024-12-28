// File: app/api/city-history/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getCityHistory } from "@/utils/gemini";
import { getCityWeather } from "@/utils/weatherService";
import { generateCityImage } from "@/utils/imageService";

interface GeminiError extends Error {
  message: string;
  status?: number;
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json(
      { success: false, error: "City name is required" },
      { status: 400 }
    );
  }

  try {
    const [historyResult, cityImage, weatherResult] = await Promise.all([
      getCityHistory(city),
      generateCityImage(city),
      getCityWeather(city),
    ]);

    if (!historyResult.success) {
      return NextResponse.json(
        { success: false, error: historyResult.error },
        { status: 500 }
      );
    }

    const data = {
      ...historyResult.data,
      images: {
        hero: cityImage,
      },
      weather: weatherResult.success ? weatherResult.data : undefined,
    };

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const geminiError = error as GeminiError;
    console.error("API route error:", geminiError);
    return NextResponse.json(
      {
        success: false,
        error: geminiError?.message || "Failed to process request",
      },
      { status: 500 }
    );
  }
}
