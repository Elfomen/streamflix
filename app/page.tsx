import { HeroBanner } from "@/components/Herobanner";
import { featuredMovie } from "@/lib/mockData";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <HeroBanner movie={featuredMovie} />
    </main>
  );
}
