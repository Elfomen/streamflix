import { Movie, Profile, Category } from "./types";

// Seeded random number generator for deterministic values
function seededRandom(seed: number): () => number {
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

// Generate placeholder image URLs using picsum with movie-like colors
const generateThumbnail = (id: number) =>
  `https://picsum.photos/seed/movie${id}/300/450`;
const generateBackdrop = (id: number) =>
  `https://picsum.photos/seed/backdrop${id}/1920/1080`;

const genres = [
  "Action",
  "Drama",
  "Comedy",
  "Thriller",
  "Horror",
  "Sci-Fi",
  "Romance",
  "Documentary",
  "Animation",
  "Crime",
  "Mystery",
  "Adventure",
  "Fantasy",
];
const ratings = ["TV-MA", "TV-14", "TV-PG", "R", "PG-13", "PG", "G"];
const directors = [
  "Christopher Nolan",
  "Martin Scorsese",
  "Quentin Tarantino",
  "Steven Spielberg",
  "Denis Villeneuve",
  "Greta Gerwig",
  "Jordan Peele",
  "Chloe Zhao",
  "Bong Joon-ho",
  "Guillermo del Toro",
];
const castMembers = [
  "Tom Hanks",
  "Meryl Streep",
  "Leonardo DiCaprio",
  "Scarlett Johansson",
  "Brad Pitt",
  "Margot Robbie",
  "Denzel Washington",
  "Viola Davis",
  "Ryan Gosling",
  "Emma Stone",
  "Timothée Chalamet",
  "Florence Pugh",
  "Oscar Isaac",
  "Zendaya",
  "Austin Butler",
];

const movieTitles = [
  "The Last Horizon",
  "Midnight in Paris",
  "Dark Waters",
  "The Silent Echo",
  "Beyond Tomorrow",
  "Crimson Peak",
  "The Hidden Truth",
  "Eternal Sunshine",
  "Lost in Translation",
  "The Grand Budapest",
  "Inception Dreams",
  "The Dark Matter",
  "Quantum Break",
  "Time Paradox",
  "The Matrix Reborn",
  "Stellar Odyssey",
  "Gravity Falls",
  "The Martian Chronicles",
  "Interstellar Voyage",
  "Ad Astra Rising",
  "The Prestige",
  "Now You See Me",
  "The Illusionist",
  "Magic Hour",
  "Sleight of Hand",
  "Breaking Dawn",
  "Twilight Zone",
  "The Midnight Club",
  "Dark Shadows",
  "Vampire Diaries",
  "Ocean's Legacy",
  "The Italian Job",
  "Heat Wave",
  "The Score",
  "Inside Man",
  "The Departed",
  "Infernal Affairs",
  "City of God",
  "Training Day",
  "The Wire",
  "Peaky Blinders",
  "The Crown",
  "Downton Legacy",
  "Bridgerton Tales",
  "The Gilded Age",
  "Stranger Things",
  "Dark",
  "Black Mirror",
  "The OA",
  "Westworld",
  "Game of Thrones",
  "House of Dragon",
  "The Witcher",
  "Lord of Rings",
  "Wheel of Time",
  "The Mandalorian",
  "Andor",
  "Obi-Wan",
  "Book of Boba",
  "Ahsoka Rising",
  "The Bear",
  "Chef's Table",
  "Boiling Point",
  "The Menu",
  "Burnt",
  "Succession",
  "Billions",
  "Industry",
  "Bad Banks",
  "Devils",
  "The Office",
  "Parks and Rec",
  "Brooklyn Nine",
  "Schitt's Creek",
  "Ted Lasso",
  "Friends Forever",
  "How I Met",
  "New Girl",
  "Happy Endings",
  "Community",
  "Breaking Bad",
  "Better Call Saul",
  "Ozark",
  "Narcos",
  "Queen's Gambit",
  "The Handmaid",
  "Severance",
  "Foundation",
  "Raised by Wolves",
  "Devs",
  "Chernobyl",
  "Band of Brothers",
  "The Pacific",
  "Generation Kill",
  "Masters of Air",
  "Planet Earth",
  "Blue Planet",
  "Our Planet",
  "Night on Earth",
  "Frozen Planet",
  "The Last Dance",
  "Formula 1 DTS",
  "Break Point",
  "Full Swing",
  "Quarterback",
  "Making a Murderer",
  "The Jinx",
  "Wild Wild Country",
  "Tiger King",
  "The Tinder Swindler",
  "Soul",
  "Inside Out",
  "Coco",
  "Encanto",
  "Turning Red",
  "Spider-Verse",
  "Arcane",
  "Love Death Robots",
  "Castlevania",
  "Invincible",
  "John Wick",
  "Nobody",
  "Extraction",
  "The Raid",
  "The Night Comes",
  "Top Gun Legacy",
  "Maverick Rising",
  "The Flyboys",
  "Wings of Honor",
  "Sky Warriors",
];

const descriptions = [
  "A gripping tale of survival and redemption in a world gone mad.",
  "An epic journey through time and space that will leave you breathless.",
  "A heart-wrenching drama about love, loss, and the human spirit.",
  "A mind-bending thriller that keeps you guessing until the very end.",
  "An action-packed adventure that pushes the limits of imagination.",
  "A touching story about family, friendship, and finding your place in the world.",
  "A dark and twisted mystery that unravels shocking secrets.",
  "A hilarious comedy that will have you laughing from start to finish.",
  "A romantic tale of star-crossed lovers in impossible circumstances.",
  "A documentary that reveals the hidden truths behind the headlines.",
];

// Generate 100 movies with deterministic seeded random values
export const allMovies: Movie[] = Array.from({ length: 100 }, (_, i) => {
  const id = i + 1;
  const random = seededRandom(id * 1000);

  const isMovie = random() > 0.4;
  const genreCount = Math.floor(random() * 3) + 1;
  const randomGenres = Array.from(
    { length: genreCount },
    () => genres[Math.floor(random() * genres.length)],
  ).filter((v, idx, a) => a.indexOf(v) === idx);

  const castCount = Math.floor(random() * 4) + 3;
  const randomCast = Array.from(
    { length: castCount },
    () => castMembers[Math.floor(random() * castMembers.length)],
  ).filter((v, idx, a) => a.indexOf(v) === idx);

  return {
    id,
    title: movieTitles[i] || `Title ${id}`,
    description: descriptions[Math.floor(random() * descriptions.length)],
    thumbnail: generateThumbnail(id),
    backdrop: generateBackdrop(id),
    year: 2015 + Math.floor(random() * 11),
    duration: isMovie
      ? `${Math.floor(random() * 60) + 90}m`
      : `${Math.floor(random() * 5) + 1} Seasons`,
    rating: ratings[Math.floor(random() * ratings.length)],
    match: Math.floor(random() * 30) + 70,
    genres: randomGenres,
    cast: randomCast,
    director: directors[Math.floor(random() * directors.length)],
    type: isMovie ? "movie" : "series",
    seasons: isMovie ? undefined : Math.floor(random() * 5) + 1,
    episodes: isMovie ? undefined : Math.floor(random() * 50) + 10,
  };
});

// Create categories
export const categories: Category[] = [
  {
    id: "trending",
    title: "Trending Now",
    movies: allMovies.slice(0, 15),
  },
  {
    id: "top-10",
    title: "Top 10 in Your Country Today",
    movies: allMovies.slice(10, 20),
  },
  {
    id: "action",
    title: "Action & Adventure",
    movies: allMovies
      .filter(
        (m) => m.genres.includes("Action") || m.genres.includes("Adventure"),
      )
      .slice(0, 15),
  },
  {
    id: "drama",
    title: "Award-Winning Dramas",
    movies: allMovies.filter((m) => m.genres.includes("Drama")).slice(0, 15),
  },
  {
    id: "comedy",
    title: "Comedies",
    movies: allMovies.filter((m) => m.genres.includes("Comedy")).slice(0, 15),
  },
  {
    id: "thriller",
    title: "Suspenseful Thrillers",
    movies: allMovies
      .filter(
        (m) => m.genres.includes("Thriller") || m.genres.includes("Mystery"),
      )
      .slice(0, 15),
  },
  {
    id: "scifi",
    title: "Sci-Fi & Fantasy",
    movies: allMovies
      .filter(
        (m) => m.genres.includes("Sci-Fi") || m.genres.includes("Fantasy"),
      )
      .slice(0, 15),
  },
  {
    id: "horror",
    title: "Horror Movies",
    movies: allMovies.filter((m) => m.genres.includes("Horror")).slice(0, 15),
  },
  {
    id: "documentary",
    title: "Documentaries",
    movies: allMovies
      .filter((m) => m.genres.includes("Documentary"))
      .slice(0, 15),
  },
  {
    id: "animation",
    title: "Animation",
    movies: allMovies
      .filter((m) => m.genres.includes("Animation"))
      .slice(0, 15),
  },
  {
    id: "new-releases",
    title: "New Releases",
    movies: allMovies.filter((m) => m.year >= 2024).slice(0, 15),
  },
  {
    id: "continue-watching",
    title: "Continue Watching",
    movies: allMovies.slice(25, 35),
  },
];

// Fill categories that might be empty
categories.forEach((cat) => {
  if (cat.movies.length < 10) {
    const additionalMovies = allMovies.slice(cat.movies.length, 15);
    cat.movies = [...cat.movies, ...additionalMovies].slice(0, 15);
  }
});

export const profiles: Profile[] = [
  {
    id: "1",
    name: "User",
    avatar: "https://picsum.photos/seed/profile1/150/150",
    isKids: false,
  },
  {
    id: "2",
    name: "Guest",
    avatar: "https://picsum.photos/seed/profile2/150/150",
    isKids: false,
  },
  {
    id: "3",
    name: "Kids",
    avatar: "https://picsum.photos/seed/profile3/150/150",
    isKids: true,
  },
];

export const featuredMovie = allMovies[0];

export const genreList = genres;
