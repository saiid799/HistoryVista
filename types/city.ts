// File: types/city.ts

export interface HistoricalEvent {
  year: number;
  description: string;
}

export interface ImageData {
  url: string;
  alt: string;
  generatedBy: string;
  photographer?: {
    name: string;
    username: string;
    url: string;
  };
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  description: string;
}

export interface CityData {
  name: string;
  events: HistoricalEvent[];
  summary: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  images: {
    hero: ImageData;
  };
  weather?: WeatherData;
}

export interface ApiResponse {
  success: boolean;
  data?: CityData;
  error?: string;
}
