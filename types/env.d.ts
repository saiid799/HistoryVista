// File: types/env.d.ts

declare namespace NodeJS {
  interface ProcessEnv {
    UNSPLASH_ACCESS_KEY: string;
    GEMINI_API_KEY: string;
    NODE_ENV: "development" | "production" | "test";
  }
}
