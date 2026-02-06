"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Play, Plus, ThumbsUp, Share2, Check, X } from "lucide-react";

import { ContentRow } from "@/components/Contentrow";
import { allMovies } from "@/lib/mockData";
import { useMyList } from "@/hooks/useMyList";
import { Button } from "@/components/ui/Button";

interface TitlePageProps {
  params: Promise<{ id: string }>;
}

export default function TitlePage({ params }: TitlePageProps) {
  const { id } = use(params);
  const movie = allMovies.find((m) => m.id === Number(id));
  const { isInList, toggleList } = useMyList();

  if (!movie) {
    notFound();
  }

  const inMyList = isInList(movie.id);
  const similarMovies = allMovies
    .filter(
      (m) =>
        m.id !== movie.id && m.genres.some((g) => movie.genres.includes(g)),
    )
    .slice(0, 15);

  return (
    <main className="min-h-screen bg-background">
      <div className="relative w-full h-[60vh] min-h-[400px]">
        <img
          src={movie.backdrop || "/placeholder.svg"}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
              <span className="text-green-500 font-semibold">
                {movie.match}% Match
              </span>
              <span className="text-foreground">{movie.year}</span>
              <span className="border border-muted-foreground px-1.5 py-0.5 text-xs text-muted-foreground">
                {movie.rating}
              </span>
              <span className="text-foreground">{movie.duration}</span>
              {movie.type === "series" && movie.seasons && (
                <span className="text-muted-foreground">
                  {movie.seasons} Seasons
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Link href={`/watch/${movie.id}`}>
                <Button className="bg-foreground hover:bg-foreground/90 text-background font-semibold px-8 py-6">
                  <Play className="h-5 w-5 mr-2 fill-current" />
                  Play
                </Button>
              </Link>
              <button
                onClick={() => toggleList(movie)}
                className="flex items-center gap-2 px-6 py-3 bg-secondary/80 hover:bg-secondary text-foreground rounded transition-colors"
              >
                {inMyList ? (
                  <>
                    <Check className="h-5 w-5" />
                    In My List
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5" />
                    My List
                  </>
                )}
              </button>
              <button className="p-3 border border-muted-foreground rounded-full hover:border-foreground transition-colors">
                <ThumbsUp className="h-5 w-5 text-foreground" />
              </button>
              <button className="p-3 border border-muted-foreground rounded-full hover:border-foreground transition-colors">
                <Share2 className="h-5 w-5 text-foreground" />
              </button>
            </div>

            <p className="text-foreground/90 text-base md:text-lg max-w-2xl">
              {movie.description}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-12 py-8">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-foreground font-semibold mb-2">Cast</h3>
              <p className="text-muted-foreground">{movie.cast.join(", ")}</p>
            </div>

            <div>
              <h3 className="text-foreground font-semibold mb-2">Director</h3>
              <p className="text-muted-foreground">{movie.director}</p>
            </div>

            {movie.type === "series" && movie.episodes && (
              <div>
                <h3 className="text-foreground font-semibold mb-4">Episodes</h3>
                <div className="space-y-3">
                  {Array.from(
                    { length: Math.min(movie.episodes, 10) },
                    (_, i) => (
                      <Link
                        key={i}
                        href={`/watch/${movie.id}?ep=${i + 1}`}
                        className="flex items-center gap-4 p-4 bg-card rounded hover:bg-accent transition-colors group"
                      >
                        <span className="text-2xl font-semibold text-muted-foreground w-8">
                          {i + 1}
                        </span>
                        <div className="w-32 h-20 rounded overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={`https://picsum.photos/seed/ep${movie.id}${i}/200/120`}
                            alt={`Episode ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-foreground font-medium mb-1">
                            Episode {i + 1}
                          </h4>
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            An exciting episode that continues the story with
                            unexpected twists and turns.
                          </p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="h-8 w-8 text-foreground" />
                        </div>
                      </Link>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-muted-foreground text-sm mb-1">Genres</h3>
              <p className="text-foreground">{movie.genres.join(", ")}</p>
            </div>
            <div>
              <h3 className="text-muted-foreground text-sm mb-1">
                This {movie.type} is
              </h3>
              <p className="text-foreground">
                Exciting, Suspenseful, Emotional
              </p>
            </div>
            <div>
              <h3 className="text-muted-foreground text-sm mb-1">
                Maturity Rating
              </h3>
              <p className="text-foreground">
                <span className="border border-muted-foreground px-1.5 py-0.5 text-xs mr-2">
                  {movie.rating}
                </span>
                Recommended for ages{" "}
                {movie.rating === "TV-MA" || movie.rating === "R"
                  ? "18+"
                  : "13+"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {similarMovies.length > 0 && (
        <div className="pb-8">
          <ContentRow title="More Like This" movies={similarMovies} />
        </div>
      )}
    </main>
  );
}
