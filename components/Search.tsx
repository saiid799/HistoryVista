import React from "react";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  onSearch: (city: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a city name..."
          className="w-full px-4 py-3 text-lg rounded-lg border border-primary/20 
                     focus:outline-none focus:border-primary/40 
                     bg-background font-blogger"
          aria-label="City search"
        />
        <button
          type="submit"
          className="absolute right-2 p-2 text-primary hover:text-secondary 
                     transition-colors duration-200"
          aria-label="Search for city"
          title="Search"
        >
          <SearchIcon className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
}
