export interface Movie {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  backdrop: string;
  year: number;
  duration: string;
  rating: string;
  match: number;
  genres: string[];
  cast: string[];
  director: string;
  type: "movie" | "series";
  seasons?: number;
  episodes?: number;
}

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  isKids: boolean;
}

export interface Category {
  id: string;
  title: string;
  movies: Movie[];
}
