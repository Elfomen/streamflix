"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Plus, ThumbsUp, ChevronDown, Check } from "lucide-react";
import { Movie } from "@/lib/types";
import { useMyList } from "@/hooks/useMyList";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  index?: number;
  showRank?: boolean;
}

export function MovieCard({ movie, index, showRank }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isInList, toggleList } = useMyList();
  const inMyList = isInList(movie.id);

  return (
    <div
      className="relative flex-shrink-0 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Rank Number for Top 10 */}
      {showRank && index !== undefined && (
        <div className="absolute -left-4 bottom-0 text-[120px] font-bold text-foreground/20 leading-none z-0 select-none">
          {index + 1}
        </div>
      )}

      {/* Base Card */}
      <Link
        href={`/title/${movie.id}`}
        className={cn(
          "block relative rounded overflow-hidden transition-all duration-300",
          showRank ? "w-32 md:w-40 ml-10" : "w-40 md:w-48",
          isHovered ? "scale-110 z-20" : "scale-100 z-10",
        )}
      >
        <div className="aspect-[2/3] relative">
          <img
            src={movie.thumbnail || "/placeholder.svg"}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay on hover */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-background to-transparent transition-opacity",
              isHovered ? "opacity-100" : "opacity-0",
            )}
          />
        </div>
      </Link>

      {/* Expanded Hover Card */}
      {isHovered && (
        <div className="absolute left-0 right-0 -bottom-24 bg-card rounded-b shadow-xl z-30 p-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Action Buttons */}
          <div className="flex items-center gap-2 mb-2">
            <Link
              href={`/watch/${movie.id}`}
              className="p-2 bg-foreground rounded-full hover:bg-foreground/90 transition-colors"
            >
              <Play className="h-4 w-4 text-background fill-current" />
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleList(movie);
              }}
              className="p-2 border border-muted-foreground rounded-full hover:border-foreground transition-colors"
              aria-label={inMyList ? "Remove from My List" : "Add to My List"}
            >
              {inMyList ? (
                <Check className="h-4 w-4 text-foreground" />
              ) : (
                <Plus className="h-4 w-4 text-foreground" />
              )}
            </button>
            <button className="p-2 border border-muted-foreground rounded-full hover:border-foreground transition-colors">
              <ThumbsUp className="h-4 w-4 text-foreground" />
            </button>
            <Link
              href={`/title/${movie.id}`}
              className="ml-auto p-2 border border-muted-foreground rounded-full hover:border-foreground transition-colors"
            >
              <ChevronDown className="h-4 w-4 text-foreground" />
            </Link>
          </div>

          {/* Info */}
          <div className="flex items-center gap-2 text-xs mb-1">
            <span className="text-green-500 font-semibold">
              {movie.match}% Match
            </span>
            <span className="border border-muted-foreground px-1 text-muted-foreground">
              {movie.rating}
            </span>
            <span className="text-muted-foreground">{movie.duration}</span>
          </div>

          {/* Genres */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {movie.genres.slice(0, 3).map((genre, i) => (
              <span key={genre} className="flex items-center">
                {i > 0 && <span className="mx-1">•</span>}
                {genre}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
