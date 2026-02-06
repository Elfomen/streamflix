"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { MovieGrid } from "@/components/MovieGrid";
import { allMovies, genreList } from "@/lib/mockData";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filteredMovies = useMemo(() => {
    let movies = [...allMovies];

    if (typeParam === "movies") {
      movies = movies.filter((m) => m.type === "movie");
    } else if (typeParam === "series") {
      movies = movies.filter((m) => m.type === "series");
    } else if (typeParam === "new") {
      movies = movies.filter((m) => m.year >= 2024);
    }

    if (selectedGenre !== "All") {
      movies = movies.filter((m) => m.genres.includes(selectedGenre));
    }

    switch (sortBy) {
      case "year":
        movies.sort((a, b) => b.year - a.year);
        break;
      case "title":
        movies.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "rating":
        movies.sort((a, b) => b.match - a.match);
        break;
      default:
        // Keep original order (popular)
        break;
    }

    return movies;
  }, [typeParam, selectedGenre, sortBy]);

  const pageTitle =
    typeParam === "movies"
      ? "Movies"
      : typeParam === "series"
        ? "TV Shows"
        : typeParam === "new"
          ? "New & Popular"
          : "Browse All";

  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 px-4 md:px-8 lg:px-12">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-foreground">
            {pageTitle}
          </h1>

          <div className="flex items-center gap-3 ml-auto">
            <div className="relative">
              <button
                onClick={() => {
                  setIsGenreOpen(!isGenreOpen);
                  setIsSortOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-foreground text-sm rounded hover:bg-accent transition-colors"
              >
                {selectedGenre === "All" ? "Genres" : selectedGenre}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isGenreOpen && "rotate-180",
                  )}
                />
              </button>

              {isGenreOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 max-h-64 overflow-y-auto bg-card border border-border rounded shadow-lg z-50">
                  <button
                    onClick={() => {
                      setSelectedGenre("All");
                      setIsGenreOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors",
                      selectedGenre === "All"
                        ? "text-primary"
                        : "text-foreground",
                    )}
                  >
                    All Genres
                  </button>
                  {genreList.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => {
                        setSelectedGenre(genre);
                        setIsGenreOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors",
                        selectedGenre === genre
                          ? "text-primary"
                          : "text-foreground",
                      )}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setIsSortOpen(!isSortOpen);
                  setIsGenreOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-foreground text-sm rounded hover:bg-accent transition-colors"
              >
                Sort By
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isSortOpen && "rotate-180",
                  )}
                />
              </button>

              {isSortOpen && (
                <div className="absolute top-full right-0 mt-1 w-40 bg-card border border-border rounded shadow-lg z-50">
                  {[
                    { value: "popular", label: "Popular" },
                    { value: "year", label: "Release Year" },
                    { value: "title", label: "Title A-Z" },
                    { value: "rating", label: "Match Score" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors",
                        sortBy === option.value
                          ? "text-primary"
                          : "text-foreground",
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-6">
          {filteredMovies.length} titles found
        </p>

        <MovieGrid movies={filteredMovies} />
      </div>
    </main>
  );
}
