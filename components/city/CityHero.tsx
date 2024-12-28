import React from "react";
import Image from "next/image";
import { MapPin, Share2, Globe2, Navigation } from "lucide-react";
import type { CityData } from "@/types/city";
import ImageCredit from "../ImageCredit";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface CityHeroProps {
  name: string;
  coordinates?: CityData["coordinates"];
  image: CityData["images"]["hero"];
  population?: string;
  timezone?: string;
}

export function CityHero({
  name,
  coordinates,
  image,
  population = "N/A",
  timezone = "N/A",
}: CityHeroProps) {
  const getLocalTime = () => {
    try {
      return new Date().toLocaleTimeString("en-US", { timeZone: timezone });
    } catch {
      return "Time unavailable";
    }
  };

  const openInMaps = () => {
    if (coordinates) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`,
        "_blank"
      );
    }
  };

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden group bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 bg-grid-primary/5"
        style={{
          backgroundSize: "30px 30px",
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)",
        }}
      />

      <div className="relative h-full max-w-6xl mx-auto px-4 flex items-center">
        {/* Left Content */}
        <div className="relative z-10 max-w-xl space-y-6">
          <div className="space-y-4">
            <h1 className="font-motter text-6xl tracking-tight text-primary">
              {name}
            </h1>

            {coordinates && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 font-blogger text-lg text-primary/80">
                  <MapPin className="w-5 h-5" />
                  <span>
                    {coordinates.lat.toFixed(4)}°N, {coordinates.lng.toFixed(4)}
                    °E
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-primary hover:text-primary-foreground"
                  onClick={openInMaps}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  View on Maps
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="secondary" size="sm">
                  <Globe2 className="w-4 h-4 mr-2" />
                  City Info
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-motter text-sm">Demographics</h4>
                  <p className="text-sm text-primary/70">
                    Population: {population}
                  </p>
                  <p className="text-sm text-primary/70">
                    Local Time: {getLocalTime()}
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    navigator.share?.({
                      title: name,
                      url: window.location.href,
                    })
                  }
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share this city</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="pt-4">
            <ImageCredit
              type={image.photographer ? "photo" : "ai"}
              credit={{
                source: image.generatedBy,
                name: image.photographer?.name,
                url: image.photographer?.url,
              }}
              className="text-primary/60"
            />
          </div>
        </div>

        {/* Right Image */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-[450px] h-[400px] rounded-lg overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover transform transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 450px) 100vw, 450px"
            priority
          />
        </div>
      </div>
    </div>
  );
}
