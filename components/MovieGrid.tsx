"use client";

import Link from "next/link";
import { Play, Plus, Check } from "lucide-react";
import { Movie } from "@/lib/types";
import { useMyList } from "@/hooks/useMyList";
import { cn } from "@/lib/utils";

interface MovieGridProps {
  movies: Movie[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
      {movies.map((movie) => (
        <MovieGridCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

function MovieGridCard({ movie }: { movie: Movie }) {
  const { isInList, toggleList } = useMyList();
  const inMyList = isInList(movie.id);

  return (
    <div className="group relative">
      <Link href={`/title/${movie.id}`} className="block">
        <div className="aspect-[2/3] rounded overflow-hidden bg-card">
          <img
            src={movie.thumbnail || "/placeholder.svg"}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 p-3">
          {/* Title */}
          <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-1">
            {movie.title}
          </h3>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Link
              href={`/watch/${movie.id}`}
              className="p-1.5 bg-foreground rounded-full hover:bg-foreground/90 transition-colors"
            >
              <Play className="h-3 w-3 text-background fill-current" />
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleList(movie);
              }}
              className={cn(
                "p-1.5 rounded-full border transition-colors",
                inMyList
                  ? "bg-foreground border-foreground"
                  : "border-muted-foreground hover:border-foreground",
              )}
              aria-label={inMyList ? "Remove from My List" : "Add to My List"}
            >
              {inMyList ? (
                <Check className="h-3 w-3 text-background" />
              ) : (
                <Plus className="h-3 w-3 text-foreground" />
              )}
            </button>
          </div>

          {/* Info */}
          <div className="flex items-center gap-2 mt-2 text-xs">
            <span className="text-green-500 font-medium">{movie.match}%</span>
            <span className="text-muted-foreground">{movie.year}</span>
            <span className="border border-muted-foreground px-1 text-muted-foreground text-[10px]">
              {movie.rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
