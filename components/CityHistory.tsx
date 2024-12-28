// File: components/CityHistory.tsx

import React, { useState } from "react";
import { Calendar, Map, Clock, ChevronRight, Filter } from "lucide-react";
import type { CityData } from "@/types/city";
import { CityHero } from "./city/CityHero";
import { CitySummary } from "./city/CitySummary";
import { CityTimeline } from "./city/CityTimeline";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CityHistoryProps {
  data: CityData;
}

interface QuickFact {
  label: string;
  value: string | number;
}

const CityHistory: React.FC<CityHistoryProps> = ({ data }) => {
  const { name, events, summary, coordinates, images } = data;
  const [activeView, setActiveView] = useState<"overview" | "timeline">(
    "overview"
  );

  const quickFacts: QuickFact[] = [
    { label: "Total Events", value: events.length },
    {
      label: "Time Span",
      value: `${events[0]?.year} - ${events[events.length - 1]?.year}`,
    },
    {
      label: "Location",
      value: coordinates
        ? `${coordinates.lat.toFixed(2)}°N, ${coordinates.lng.toFixed(2)}°E`
        : "N/A",
    },
    {
      label: "Historical Periods",
      value: `${Math.floor(events.length / 2)} major eras`,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 px-4 md:px-6 animate-fade-in">
      {/* Navigation Tabs */}
      <div className="sticky top-4 z-30 bg-background/80 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-primary/10 transition-all duration-300 hover:bg-background/90">
        <Tabs
          value={activeView}
          onValueChange={(v) => setActiveView(v as typeof activeView)}
          className="w-full"
        >
          <div className="flex items-center justify-between">
            <TabsList className="grid w-[400px] grid-cols-2">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors"
              >
                <Map className="w-4 h-4 mr-2" />
                City Overview
              </TabsTrigger>
              <TabsTrigger
                value="timeline"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors"
              >
                <Clock className="w-4 h-4 mr-2" />
                Timeline
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Calendar className="w-4 h-4 mr-1" />
                Sort by Date
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Filter className="w-4 h-4 mr-1" />
                Filter Events
              </Button>
            </div>
          </div>
        </Tabs>
      </div>

      {/* Hero Section */}
      <div className="transform transition-all duration-500 hover:scale-[1.01]">
        <CityHero name={name} coordinates={coordinates} image={images.hero} />
      </div>

      {/* Content Sections */}
      <div
        className={cn(
          "view-transition",
          activeView === "overview" ? "view-visible" : "view-hidden"
        )}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <CitySummary name={name} summary={summary} />
          </div>

          <div className="lg:col-span-2 space-y-8">
            {/* Quick Facts Section */}
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-primary/10 transition-all duration-300 hover:shadow-xl">
              <h2 className="font-motter text-2xl mb-4">Quick Facts</h2>
              <div className="grid grid-cols-2 gap-4 stagger-animation">
                {quickFacts.map((fact, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg bg-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-md"
                  >
                    <h3 className="text-sm text-primary/60 mb-1">
                      {fact.label}
                    </h3>
                    <p className="font-motter text-lg">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Historical Impact Section */}
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-primary/10 transition-all duration-300 hover:shadow-xl">
              <h2 className="font-motter text-2xl mb-4">Historical Impact</h2>
              <div className="space-y-4 stagger-animation">
                {events.slice(0, 3).map((event, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-lg bg-white/70 backdrop-blur-sm group hover:bg-primary/5 transition-all duration-300"
                  >
                    <div className="w-16 text-center">
                      <span className="font-motter text-lg text-primary/80">
                        {event.year}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-blogger text-base text-primary/80">
                        {event.description}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline View */}
      <div
        className={cn(
          "view-transition",
          activeView === "timeline" ? "view-visible" : "view-hidden"
        )}
      >
        <CityTimeline events={events} />
      </div>

      {/* Bottom Decoration */}
      <div className="relative h-32 overflow-hidden rounded-xl">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-secondary transform -skew-y-6" />
          <div className="absolute inset-0 bg-gradient-to-l from-secondary via-primary to-secondary transform skew-y-6" />
        </div>
      </div>
    </div>
  );
};

export default CityHistory;
