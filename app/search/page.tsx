"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { MovieGrid } from "@/components/MovieGrid";
import { allMovies } from "@/lib/mockData";
import { Search, X } from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [debouncedQuery, setDebouncedQuery] = useState(queryParam);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      if (searchQuery) {
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`, {
          scroll: false,
        });
      } else {
        router.push("/search", { scroll: false });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, router]);

  const searchResults = useMemo(() => {
    if (!debouncedQuery.trim()) return [];

    const query = debouncedQuery.toLowerCase();
    return allMovies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(query) ||
        movie.description.toLowerCase().includes(query) ||
        movie.genres.some((g) => g.toLowerCase().includes(query)) ||
        movie.cast.some((c) => c.toLowerCase().includes(query)) ||
        movie.director.toLowerCase().includes(query),
    );
  }, [debouncedQuery]);

  const popularSearches = [
    "Action",
    "Comedy",
    "Drama",
    "Sci-Fi",
    "Horror",
    "Documentary",
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 px-4 md:px-8 lg:px-12">
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for movies, TV shows, genres, people..."
              className="w-full pl-12 pr-12 py-4 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {!debouncedQuery ? (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Popular Searches
            </h2>
            <div className="flex flex-wrap gap-3">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="px-4 py-2 bg-card border border-border rounded-full text-sm text-foreground hover:bg-accent transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>

            <h2 className="text-lg font-semibold text-foreground mt-12 mb-4">
              Trending Now
            </h2>
            <MovieGrid movies={allMovies.slice(0, 12)} />
          </div>
        ) : searchResults.length > 0 ? (
          <div>
            <p className="text-muted-foreground mb-6">
              {searchResults.length} results for &ldquo;{debouncedQuery}&rdquo;
            </p>
            <MovieGrid movies={searchResults} />
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No results found for &ldquo;{debouncedQuery}&rdquo;
            </h2>
            <p className="text-muted-foreground mb-8">
              Try searching for something else, or explore our popular titles
              below.
            </p>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              You might like
            </h3>
            <MovieGrid movies={allMovies.slice(0, 12)} />
          </div>
        )}
      </div>
    </main>
  );
}
