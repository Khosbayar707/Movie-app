import { FrontPage } from "./_components/FrontPage";
import { Section } from "./_components/Section";

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Movie Z — this week&apos;s movie listings</h1>
      <FrontPage />
      <Section title="Upcoming" endpoint="upcoming" description="Opening soon in theaters." />
      <Section
        title="Top Rated"
        endpoint="top_rated"
        variant="chart"
        description="Highest rated on TMDB."
      />
      <Section title="Popular" endpoint="popular" description="Most popular on TMDB right now." />
    </>
  );
}
