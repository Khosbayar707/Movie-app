import Link from "next/link";
import { Movie } from "../types";

type Props = {
  prop: Movie;
};
export function Card(props: Props) {
  // console.log("movie", props.prop);
  return (
    <Link href={`/movie/${props.prop?.id}`}>
      <div className="mx-2 my-2 rounded-lg shadow-lg bg-secondary">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${props.prop?.poster_path}`}
            alt="posters"
            className="w-full h-auto rounded-t-lg"
          />
          <div className="p-2">
            <b>{props.prop?.title}</b>
            <p className="text-[12px] mt-2">
              ⭐️{props.prop?.vote_average.toFixed(1)}/10
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
