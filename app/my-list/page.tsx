"use client";

import { MovieGrid } from "@/components/MovieGrid";
import { useMyList } from "@/hooks/useMyList";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function MyListPage() {
  const { myList, isLoaded } = useMyList();

  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 px-4 md:px-8 lg:px-12 min-h-[60vh]">
        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-8">
          My List
        </h1>

        {!isLoaded ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] bg-card rounded animate-pulse"
              />
            ))}
          </div>
        ) : myList.length > 0 ? (
          <MovieGrid movies={myList} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-card flex items-center justify-center mb-6">
              <Plus className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Your list is empty
            </h2>
            <p className="text-muted-foreground max-w-md mb-6">
              Add movies and TV shows to your list by clicking the + button on
              any title. They will appear here for easy access.
            </p>
            <Link
              href="/browse"
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded transition-colors"
            >
              Browse Titles
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
