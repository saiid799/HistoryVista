import React, { useState } from "react";
import {
  Clock,
  ChevronRight,
  Filter,
  Building2,
  Crown,
  Users2,
  Landmark,
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";
import type { HistoricalEvent } from "@/types/city";

interface TimelineEventType {
  type: "cultural" | "political" | "architectural" | "social";
  icon: React.ReactNode;
  color: string;
}

const eventTypes: Record<string, TimelineEventType> = {
  cultural: {
    type: "cultural",
    icon: <Users2 className="w-4 h-4" />,
    color: "bg-purple-500/10 text-purple-600",
  },
  political: {
    type: "political",
    icon: <Crown className="w-4 h-4" />,
    color: "bg-blue-500/10 text-blue-600",
  },
  architectural: {
    type: "architectural",
    icon: <Building2 className="w-4 h-4" />,
    color: "bg-amber-500/10 text-amber-600",
  },
  social: {
    type: "social",
    icon: <Landmark className="w-4 h-4" />,
    color: "bg-emerald-500/10 text-emerald-600",
  },
};

interface TimelineEventProps {
  event: HistoricalEvent;
  isHighlighted: boolean;
  onHighlight: () => void;
  eventId: string;
  type: TimelineEventType;
}

function TimelineEvent({
  event,
  isHighlighted,
  onHighlight,
  eventId,
  type,
}: TimelineEventProps) {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-[39px] top-0 h-full w-[2px] bg-gradient-to-b from-primary/5 to-primary/20" />

      <Card
        className={cn(
          "relative ml-20 group transition-all duration-300 hover:shadow-lg border-none",
          isHighlighted ? "bg-primary/5" : "bg-white/50",
          "backdrop-blur-sm transform hover:translate-x-2 cursor-pointer"
        )}
        onClick={onHighlight}
        id={eventId}
      >
        {/* Year Bubble */}
        <div
          className={cn(
            "absolute -left-20 top-6 w-10 h-10 rounded-full flex items-center justify-center",
            type.color,
            "border-4 border-background transition-colors duration-300",
            isHighlighted ? "scale-110" : ""
          )}
        >
          {type.icon}
        </div>

        <div className="p-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-motter text-lg text-primary/80">
                  {event.year}
                </span>
                <Badge
                  variant="outline"
                  className={cn("capitalize text-xs", type.color)}
                >
                  {type.type}
                </Badge>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to highlight</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <p className="font-blogger text-base leading-relaxed text-primary/80 pl-0.5">
              {event.description}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function CityTimeline({ events }: { events: HistoricalEvent[] }) {
  const [highlightedEventId, setHighlightedEventId] = useState<string | null>(
    null
  );
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Group events by century
  const groupedEvents = events.reduce((acc, event) => {
    const century = Math.floor(event.year / 100) + 1;
    if (!acc[century]) {
      acc[century] = [];
    }
    acc[century].push(event);
    return acc;
  }, {} as Record<number, typeof events>);

  // Function to determine event type based on description and year
  const getEventType = (event: HistoricalEvent): TimelineEventType => {
    const typeKeys = Object.keys(eventTypes);
    const hash = (event.year.toString() + event.description)
      .split("")
      .reduce((acc, char) => {
        return (acc << 5) - acc + char.charCodeAt(0);
      }, 0);
    return eventTypes[typeKeys[Math.abs(hash) % typeKeys.length]];
  };

  return (
    <div className="bg-gradient-to-br from-background to-primary/5 backdrop-blur-sm rounded-xl p-6">
      <div className="sticky top-0 z-20 pb-6 bg-gradient-to-b from-background via-background to-transparent">
        <div className="flex items-center justify-between">
          <h2 className="font-motter text-3xl text-primary">
            Historical Timeline
          </h2>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-primary/60" />
            <div className="flex gap-2">
              {Object.entries(eventTypes).map(([key, type]) => (
                <Button
                  key={key}
                  variant={selectedType === key ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() =>
                    setSelectedType(selectedType === key ? null : key)
                  }
                  className={cn(
                    "capitalize",
                    selectedType === key ? type.color : ""
                  )}
                >
                  {type.icon}
                  <span className="ml-2">{key}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[600px] pr-6">
        <div className="space-y-12">
          {Object.entries(groupedEvents)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([century, centuryEvents]) => (
              <div key={century} className="relative">
                <Badge
                  variant="secondary"
                  className="mb-6 text-lg py-1.5 px-4 font-motter inline-flex items-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  {century}th Century
                </Badge>

                <div className="space-y-6">
                  {centuryEvents
                    .filter(
                      (event) =>
                        !selectedType ||
                        getEventType(event).type === selectedType
                    )
                    .map((event, index) => {
                      const eventId = `${century}-${index}`;
                      const eventType = getEventType(event);
                      return (
                        <TimelineEvent
                          key={eventId}
                          event={event}
                          eventId={eventId}
                          type={eventType}
                          isHighlighted={highlightedEventId === eventId}
                          onHighlight={() => {
                            setHighlightedEventId(
                              highlightedEventId === eventId ? null : eventId
                            );
                            document.getElementById(eventId)?.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                            });
                          }}
                        />
                      );
                    })}
                </div>
              </div>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
}
