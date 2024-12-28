// File: components/city/CitySummary.tsx

import React from "react";
import {
  Info,
  Building2,
  Users2,
  Landmark,
  Trees,
  Cloud,
  Wind,
  Droplets,
  Thermometer,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { Progress } from "../ui/progress";
import type { WeatherData } from "@/types/city";

interface CitySummaryProps {
  name: string;
  summary: string;
  weather?: WeatherData;
}

interface QuickFactProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  score?: number;
}

function QuickFact({ icon, title, value, score }: QuickFactProps) {
  return (
    <div className="space-y-2 p-4 rounded-lg bg-white/50 hover:bg-white/70 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="bg-secondary/10 rounded-full p-2 w-fit">{icon}</div>
        {score !== undefined && <Progress value={score} className="w-16 h-1" />}
      </div>
      <h3 className="font-motter text-sm text-primary/60">{title}</h3>
      <p className="font-blogger text-primary/80 font-medium">{value}</p>
    </div>
  );
}

export function CitySummary({ name, summary, weather }: CitySummaryProps) {
  // Analyze summary text to generate pseudo-random scores
  const getScore = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash % 100);
  };

  return (
    <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <CardContent className="p-6">
        <div className="space-y-8">
          {/* Summary Section */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-secondary/10 rounded-full p-2">
                <Info className="w-5 h-5 text-secondary" />
              </div>
              <div className="space-y-2">
                <h2 className="font-motter text-2xl text-primary">
                  About {name}
                </h2>
                <p className="font-blogger text-lg leading-relaxed text-primary/80">
                  {summary}
                </p>
              </div>
            </div>
          </div>

          <Separator className="bg-primary/5" />

          {/* Quick Facts Grid */}
          <div className="grid grid-cols-2 gap-4">
            <QuickFact
              icon={<Building2 className="w-4 h-4 text-secondary" />}
              title="Architecture"
              value="Historical Sites"
              score={getScore("architecture" + name)}
            />
            <QuickFact
              icon={<Users2 className="w-4 h-4 text-secondary" />}
              title="Culture"
              value="Rich Heritage"
              score={getScore("culture" + name)}
            />
            <QuickFact
              icon={<Landmark className="w-4 h-4 text-secondary" />}
              title="Landmarks"
              value="Notable Places"
              score={getScore("landmarks" + name)}
            />
            <QuickFact
              icon={<Trees className="w-4 h-4 text-secondary" />}
              title="Nature"
              value="Green Spaces"
              score={getScore("nature" + name)}
            />
          </div>

          <Separator className="bg-primary/5" />

          {/* Weather Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-secondary/10 rounded-full p-2">
                  <Cloud className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="font-motter text-lg text-primary">
                  Current Weather
                </h3>
              </div>
              <span className="text-xs text-primary/40 bg-primary/5 px-2 py-1 rounded-full">
                Live Updates
              </span>
            </div>

            {weather ? (
              <div className="space-y-6">
                {/* Main Weather Display */}
                <div className="flex items-center justify-between p-4 bg-white/40 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-secondary/20 rounded-full p-3">
                      <Thermometer className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="font-motter text-2xl">
                        {weather.temperature}°C
                      </p>
                      <p className="text-sm text-primary/60">
                        {weather.condition}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-primary/60">
                      {weather.description}
                    </p>
                  </div>
                </div>

                {/* Weather Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-white/30 rounded-lg">
                    <div className="bg-secondary/10 rounded-full p-2">
                      <Droplets className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{weather.humidity}%</p>
                      <p className="text-xs text-primary/60">Humidity</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/30 rounded-lg">
                    <div className="bg-secondary/10 rounded-full p-2">
                      <Wind className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {weather.windSpeed} km/h
                      </p>
                      <p className="text-xs text-primary/60">Wind Speed</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 bg-white/30 rounded-lg">
                <div className="text-center text-primary/40">
                  <Cloud className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                  <p>Loading weather data...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
