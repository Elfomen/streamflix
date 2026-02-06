"use client";

import { use, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  Settings,
  Subtitles,
} from "lucide-react";
import { allMovies } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface WatchPageProps {
  params: Promise<{ id: string }>;
}

export default function WatchPage({ params }: WatchPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const episode = searchParams.get("ep");
  const movie = allMovies.find((m) => m.id === Number(id));

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

  if (!movie) {
    notFound();
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
      if (isPlaying) {
        hideControlsTimeout.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, [isPlaying]);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (percent: number) => {
    const totalMinutes = parseInt(movie.duration) || 120;
    const currentMinutes = Math.floor((percent / 100) * totalMinutes);
    const hours = Math.floor(currentMinutes / 60);
    const minutes = currentMinutes % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };

  const remainingTime = () => {
    const totalMinutes = parseInt(movie.duration) || 120;
    const currentMinutes = Math.floor((progress / 100) * totalMinutes);
    const remaining = totalMinutes - currentMinutes;
    const hours = Math.floor(remaining / 60);
    const minutes = remaining % 60;
    return `-${hours}:${minutes.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden cursor-none"
      onMouseMove={() => setShowControls(true)}
    >
      <div className="absolute inset-0">
        <img
          src={movie.backdrop || "/placeholder.svg"}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div
          className={cn(
            "absolute inset-0 bg-black/50 transition-opacity duration-300",
            isPlaying ? "opacity-0" : "opacity-100",
          )}
        />
      </div>

      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-300 cursor-auto",
          showControls ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 pt-12 ">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
              aria-label="Go back"
            >
              <ArrowLeft className="h-6 w-6 text-white" />
            </button>
            <div>
              <h1 className="text-white font-semibold text-lg">
                {movie.title}
              </h1>
              {episode && (
                <p className="text-white/70 text-sm">Episode {episode}</p>
              )}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-6 bg-white/20 hover:bg-white/30 rounded-full transition-all transform hover:scale-110"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-12 w-12 text-white fill-current" />
            ) : (
              <Play className="h-12 w-12 text-white fill-current ml-1" />
            )}
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="group mb-4">
            <div
              className="relative h-1 bg-white/30 rounded-full cursor-pointer group-hover:h-2 transition-all"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const percent = ((e.clientX - rect.left) / rect.width) * 100;
                setProgress(Math.max(0, Math.min(100, percent)));
              }}
            >
              <div
                className="absolute left-0 top-0 h-full bg-white/50 rounded-full"
                style={{ width: `${Math.min(progress + 20, 100)}%` }}
              />
              <div
                className="absolute left-0 top-0 h-full bg-primary rounded-full"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `calc(${progress}% - 8px)` }}
              />
            </div>
            <div className="flex justify-between text-white/70 text-xs mt-1">
              <span>{formatTime(progress)}</span>
              <span>{remainingTime()}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="hover:text-white/80 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8 text-white" />
                ) : (
                  <Play className="h-8 w-8 text-white" />
                )}
              </button>

              <button
                onClick={() => setProgress((prev) => Math.max(0, prev - 5))}
                className="hover:text-white/80 transition-colors"
                aria-label="Rewind 10 seconds"
              >
                <SkipBack className="h-6 w-6 text-white" />
              </button>

              <button
                onClick={() => setProgress((prev) => Math.min(100, prev + 5))}
                className="hover:text-white/80 transition-colors"
                aria-label="Forward 10 seconds"
              >
                <SkipForward className="h-6 w-6 text-white" />
              </button>

              <div className="flex items-center gap-2 group/volume">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-white/80 transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-6 w-6 text-white" />
                  ) : (
                    <Volume2 className="h-6 w-6 text-white" />
                  )}
                </button>
                <div className="w-0 group-hover/volume:w-24 overflow-hidden transition-all">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      setIsMuted(false);
                    }}
                    className="w-24 accent-primary"
                  />
                </div>
              </div>

              <span className="text-white text-sm hidden md:inline">
                {movie.title}
                {episode && ` - Episode ${episode}`}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {movie.type === "series" && episode && (
                <Link
                  href={`/watch/${movie.id}?ep=${Number(episode) + 1}`}
                  className="px-4 py-1.5 bg-white/20 hover:bg-white/30 text-white text-sm rounded transition-colors hidden md:block"
                >
                  Next Episode
                </Link>
              )}

              <button
                className="hover:text-white/80 transition-colors"
                aria-label="Subtitles"
              >
                <Subtitles className="h-6 w-6 text-white" />
              </button>

              <button
                className="hover:text-white/80 transition-colors"
                aria-label="Settings"
              >
                <Settings className="h-6 w-6 text-white" />
              </button>

              <button
                onClick={toggleFullscreen}
                className="hover:text-white/80 transition-colors"
                aria-label={
                  isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                }
              >
                <Maximize className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {!isPlaying && progress === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-white/50 text-lg">Click to play</p>
          </div>
        </div>
      )}
    </div>
  );
}
