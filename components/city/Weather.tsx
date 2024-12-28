// File: components/city/Weather.tsx

import React from "react";
import { Cloud, Thermometer, Droplets, Wind } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  description: string;
}

interface WeatherProps {
  data?: WeatherData;
  isLoading?: boolean;
  error?: string;
}

export function Weather({ data, isLoading, error }: WeatherProps) {
  if (error) {
    return null;
  }

  if (isLoading) {
    return (
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Cloud className="w-5 h-5 text-secondary animate-pulse" />
            <div className="w-full space-y-2">
              <div className="h-4 bg-primary/5 rounded animate-pulse w-24" />
              <div className="h-4 bg-primary/5 rounded animate-pulse w-32" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Card className="bg-white/50 backdrop-blur-sm border-none">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-secondary" />
            <h3 className="font-motter text-sm text-primary/60">
              Current Weather
            </h3>
          </div>
          <span className="text-sm text-primary/40">Live Updates</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-secondary/80" />
            <div>
              <p className="text-sm font-medium">{data.temperature}°C</p>
              <p className="text-xs text-primary/60">{data.condition}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-secondary/80" />
            <div>
              <p className="text-sm font-medium">{data.humidity}%</p>
              <p className="text-xs text-primary/60">Humidity</p>
            </div>
          </div>

          <div className="col-span-2 flex items-center gap-2">
            <Wind className="w-4 h-4 text-secondary/80" />
            <div>
              <p className="text-sm font-medium">{data.windSpeed} km/h</p>
              <p className="text-xs text-primary/60">Wind Speed</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-primary/70 border-t border-primary/5 pt-3">
          {data.description}
        </p>
      </CardContent>
    </Card>
  );
}
