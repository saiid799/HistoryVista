"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import Search from "@/components/Search";
import CityHistory from "@/components/CityHistory";
import LoadingState from "@/components/LoadingState";
import type { CityData } from "@/types/city";

export default function Home() {
  const [searchState, setSearchState] = useState<{
    loading: boolean;
    error?: string;
    data?: CityData;
  }>({
    loading: false,
  });

  const handleSearch = async (city: string) => {
    setSearchState({ loading: true });

    try {
      const response = await fetch(
        `/api/city-history?city=${encodeURIComponent(city)}`
      );
      const result = await response.json();

      if (!result.success) {
        setSearchState({
          loading: false,
          error: result.error || "Failed to fetch city history",
        });
        return;
      }

      setSearchState({
        loading: false,
        data: result.data,
      });
    } catch {
      // Removed unused 'err' parameter
      setSearchState({
        loading: false,
        error: "Failed to fetch city history. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="py-20 px-4 text-center">
        <h1 className="font-motter text-5xl mb-6 text-primary">
          City History Explorer
        </h1>
        <p className="font-blogger text-xl mb-12 text-primary/80 max-w-2xl mx-auto">
          Discover the rich history of cities around the world through an
          interactive journey through time. Powered by AI for accurate and
          engaging historical insights.
        </p>
        <Search onSearch={handleSearch} />
      </header>

      <main className="px-4 pb-20">
        {searchState.loading ? (
          <LoadingState />
        ) : searchState.error ? (
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="inline-flex items-center gap-2 text-destructive mb-4">
              <AlertTriangle className="w-6 h-6" />
              <span className="font-blogger text-lg">Error</span>
            </div>
            <p className="font-blogger text-xl text-primary/60">
              {searchState.error}
            </p>
          </div>
        ) : searchState.data ? (
          <CityHistory data={searchState.data} />
        ) : null}
      </main>

      <footer className="py-8 text-center text-primary/60">
        <p className="font-blogger text-sm">
          Powered by Gemini AI • Explore historical cities
        </p>
      </footer>
    </div>
  );
}
