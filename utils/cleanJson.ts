// File: utils/cleanJson.ts

export function cleanJsonResponse(text: string): string {
  // Remove markdown code block markers and any surrounding whitespace
  let cleaned = text
    .replace(/```json\s*/, "")
    .replace(/```\s*$/, "")
    .trim();

  // If the text still doesn't start with {, try to find the first {
  if (!cleaned.startsWith("{")) {
    const firstBrace = cleaned.indexOf("{");
    if (firstBrace !== -1) {
      cleaned = cleaned.slice(firstBrace);
    }
  }

  // If the text doesn't end with }, try to find the last }
  if (!cleaned.endsWith("}")) {
    const lastBrace = cleaned.lastIndexOf("}");
    if (lastBrace !== -1) {
      cleaned = cleaned.slice(0, lastBrace + 1);
    }
  }

  return cleaned;
}
