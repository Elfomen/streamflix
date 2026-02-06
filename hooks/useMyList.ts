"use client";

import { useState, useCallback } from "react";
import { Movie } from "@/lib/types";
import { allMovies } from "@/lib/mockData";

const MY_LIST_KEY = "netflix-my-list";

export function useMyList() {
  const [myList, setMyList] = useState<Movie[]>(() => {
    const stored = localStorage.getItem(MY_LIST_KEY);
    if (stored) {
      const ids: number[] = JSON.parse(stored);
      const movies = ids
        .map((id) => allMovies.find((m) => m.id === id))
        .filter(Boolean) as Movie[];
      return movies;
    }
    return [];
  });

  const addToList = useCallback((movie: Movie) => {
    setMyList((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      const newList = [...prev, movie];
      localStorage.setItem(
        MY_LIST_KEY,
        JSON.stringify(newList.map((m) => m.id)),
      );
      return newList;
    });
  }, []);

  const removeFromList = useCallback((movieId: number) => {
    setMyList((prev) => {
      const newList = prev.filter((m) => m.id !== movieId);
      localStorage.setItem(
        MY_LIST_KEY,
        JSON.stringify(newList.map((m) => m.id)),
      );
      return newList;
    });
  }, []);

  const isInList = useCallback(
    (movieId: number) => {
      return myList.some((m) => m.id === movieId);
    },
    [myList],
  );

  const toggleList = useCallback(
    (movie: Movie) => {
      if (isInList(movie.id)) {
        removeFromList(movie.id);
      } else {
        addToList(movie);
      }
    },
    [isInList, addToList, removeFromList],
  );

  return {
    myList,
    addToList,
    removeFromList,
    isInList,
    toggleList,
    isLoaded: true,
  };
}
