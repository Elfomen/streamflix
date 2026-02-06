import { ContentRow } from "@/components/Contentrow";
import { HeroBanner } from "@/components/Herobanner";
import { categories, featuredMovie } from "@/lib/mockData";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <HeroBanner movie={featuredMovie} />

      <div className="-mt-32 relative z-10">
        {categories.map((category) => (
          <ContentRow
            key={category.id}
            title={category.title}
            movies={category.movies}
            showRank={category.id === "top-10"}
          />
        ))}
      </div>
    </main>
  );
}
