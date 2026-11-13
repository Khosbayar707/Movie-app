import { Hero } from "./_components/Hero";
import { Section } from "./_components/Section";

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Movie Z — discover movies</h1>
      <Hero />
      <div className="pb-8">
        <Section title="Upcoming" endpoint="upcoming" />
        <Section title="Top Rated" endpoint="top_rated" />
        <Section title="Popular" endpoint="popular" />
      </div>
    </>
  );
}
