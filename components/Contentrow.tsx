"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Movie } from "@/lib/types";
import { MovieCard } from "./MovieCard";
import { cn } from "@/lib/utils";

interface ContentRowProps {
  title: string;
  movies: Movie[];
  showRank?: boolean;
}

export function ContentRow({ title, movies, showRank }: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.8;
      const newScrollLeft =
        direction === "left"
          ? rowRef.current.scrollLeft - scrollAmount
          : rowRef.current.scrollLeft + scrollAmount;

      rowRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <div className="relative group/row  mb-8">
      {/* Title */}
      <h2 className="text-lg md:text-xl font-semibold text-foreground mb-3 px-4 md:px-8 lg:px-12">
        {title}
      </h2>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className={cn(
            "absolute left-0 top-0 bottom-0 z-40 w-12 flex items-center justify-center",
            "bg-background/60 hover:bg-background/80 transition-all",
            "opacity-0 group-hover/row:opacity-100",
            !showLeftArrow && "hidden",
          )}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-8 w-8 text-foreground" />
        </button>

        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex gap-2 overflow-x-hidden scrollbar-hide px-4 md:px-8 lg:px-12 pb-24"
        >
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              index={index}
              showRank={showRank}
            />
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className={cn(
            "absolute right-0 top-0 bottom-0 z-40 w-12 flex items-center justify-center",
            "bg-background/60 hover:bg-background/80 transition-all",
            "opacity-0 group-hover/row:opacity-100",
            !showRightArrow && "hidden",
          )}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-8 w-8 text-foreground" />
        </button>
      </div>
    </div>
  );
}
