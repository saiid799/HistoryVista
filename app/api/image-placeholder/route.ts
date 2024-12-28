// File: app/api/image-placeholder/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createCanvas } from "canvas";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const width = parseInt(searchParams.get("width") || "1200");
  const height = parseInt(searchParams.get("height") || "800");
  const text = searchParams.get("text") || "";
  const bg = searchParams.get("bg") || "e2e8f0";

  // Create canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Fill background
  ctx.fillStyle = `#${bg}`;
  ctx.fillRect(0, 0, width, height);

  // Add text
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${Math.min(width, height) / 10}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2);

  // Convert to buffer
  const buffer = canvas.toBuffer("image/jpeg");

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
