"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Info, VolumeX, Volume2 } from "lucide-react";
import { Movie } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

interface HeroBannerProps {
  movie: Movie;
}

export function HeroBanner({ movie }: HeroBannerProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded] = useState(true);

  return (
    <div className="relative w-full h-[56vw] min-h-[400px] max-h-[85vh]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={movie.backdrop || "/placeholder.svg"}
          alt={movie.title}
          className="w-full h-full object-cover"
          width={1920}
          height={1094}
          quality={100}
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Content */}
      <div
        className={`absolute bottom-[20%] left-4 md:left-8 lg:left-12 max-w-xl transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
          {movie.title}
        </h1>

        {/* Match Score and Info */}
        <div className="flex items-center gap-3 mb-4 text-sm">
          <span className="text-green-500 font-semibold">
            {movie.match}% Match
          </span>
          <span className="text-muted-foreground">{movie.year}</span>
          <span className="border border-muted-foreground px-1 text-xs text-muted-foreground">
            {movie.rating}
          </span>
          <span className="text-muted-foreground">{movie.duration}</span>
        </div>

        {/* Description */}
        <p className="text-sm md:text-base text-foreground/90 mb-6 line-clamp-3 max-w-lg">
          {movie.description}
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Link href={`/watch/${movie.id}`}>
            <Button className="bg-foreground hover:bg-foreground/90 text-background font-semibold px-6 py-6">
              <Play className="h-5 w-5 mr-2 fill-current" />
              Play
            </Button>
          </Link>
          <Link href={`/title/${movie.id}`}>
            <Button
              variant="secondary"
              className="bg-secondary/80 hover:bg-secondary text-foreground font-semibold px-6 py-6"
            >
              <Info className="h-5 w-5 mr-2" />
              More Info
            </Button>
          </Link>
        </div>
      </div>

      {/* Mute Button and Rating */}
      <div className="absolute bottom-[20%] right-4 md:right-8 lg:right-12 flex items-center gap-4">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 rounded-full border border-foreground/50 text-foreground hover:bg-foreground/10 transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </button>
        <div className="bg-secondary/60 border-l-2 border-foreground py-1 px-4 text-sm">
          {movie.rating}
        </div>
      </div>
    </div>
  );
}
