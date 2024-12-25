import { Card } from "../_components/Card";
import { ArrowRight } from "lucide-react";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzk2OTBmOTgzMGNlODA0Yjc4OTRhYzFkZWY0ZjdlOSIsIm5iZiI6MTczNDk0OTM3MS43NDIsInN1YiI6IjY3NjkzOWZiYzdmMTcyMDVkMTBiMGIxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2r2TerxSJdZGmGVSLVDkk6nHT0NPqY4rOcxHtMNt0aE",
  },
};
export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
type Props = {
  params: Params;
};
type Params = {
  category: string;
};

export default async function Page(props: Props) {
  //   console.log("param----", props);
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${props.params.category}?language=en-US&page=1`,
    options
  );
  const data = await res.json();
  const movies = data.results?.slice(1, 30);
  return (
    <div>
      <div className="flex justify-between w-[90%] mx-auto mt-12">
        <b className="text-lg">
          {props.params.category.toUpperCase().replace("_", " ")}
        </b>
        <button className="flex">
          See more <ArrowRight />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 w-[90%] mx-auto my-6">
        {movies.map((movie: Movie) => (
          <Card prop={movie} />
        ))}
      </div>
    </div>
  );
}
