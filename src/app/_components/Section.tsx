import { ArrowRight } from "lucide-react";
import { Movie } from "../types";
import { Card } from "../_components/Card";
import { Suspense } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzk2OTBmOTgzMGNlODA0Yjc4OTRhYzFkZWY0ZjdlOSIsIm5iZiI6MTczNDk0OTM3MS43NDIsInN1YiI6IjY3NjkzOWZiYzdmMTcyMDVkMTBiMGIxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2r2TerxSJdZGmGVSLVDkk6nHT0NPqY4rOcxHtMNt0aE",
  },
};
type Props = {
  title: string;
  endpoint: string;
};

export async function Section(props: Props) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${props.endpoint}?language=en-US&page=1`,
    options
  );
  const data = await res.json();
  const movies = data.results?.slice(1, 13);
  return (
    <div>
      <div className="flex justify-between w-[90%] mx-auto">
        <b className="text-lg">{props.title}</b>
        <a href={`/${props.endpoint}?language=en-US&page=1`}>
          <button className="flex">
            See more <ArrowRight />
          </button>
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 w-[90%] mx-auto my-6">
        <Suspense>
          {movies &&
            movies.map((movie: Movie) => (
              <Card prop={movie} key={`movie/${movie.id}`} />
            ))}
        </Suspense>
      </div>
    </div>
  );
}
