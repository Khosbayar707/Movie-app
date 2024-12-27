import { ArrowRight } from "lucide-react";
import { Movie } from "../[category]/page";
import { Card } from "../_components/Card";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzk2OTBmOTgzMGNlODA0Yjc4OTRhYzFkZWY0ZjdlOSIsIm5iZiI6MTczNDk0OTM3MS43NDIsInN1YiI6IjY3NjkzOWZiYzdmMTcyMDVkMTBiMGIxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2r2TerxSJdZGmGVSLVDkk6nHT0NPqY4rOcxHtMNt0aE",
  },
};

export async function Recommendations({ id }) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations`,
    options
  );
  const data = await res.json();
  const movies = data.results?.slice(1, 13);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 w-[90%] mx-auto my-6">
      {movies.map((movie: Movie) => (
        <Card prop={movie} />
      ))}
    </div>
  );
}
