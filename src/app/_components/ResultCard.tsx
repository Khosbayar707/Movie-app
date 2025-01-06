import Link from "next/link";
import { Movie } from "../types";

type Props = {
  prop: Movie;
};
export function ResultCard(props: Props) {
  // console.log("movie", props.prop);
  return (
    <Link href={`/movie/${props.prop?.id}`}>
      <div className="shadow-lg bg-secondary border-b border-gray-#E4E4E7">
        <div className="flex p-2">
          <img
            src={`https://image.tmdb.org/t/p/w500/${props.prop?.poster_path}`}
            alt="posters"
            className="w-[50px] h-[80px] rounded-lg mt-2"
          />
          <div className="p-2">
            <p className="text-sm mt-2 font-bold">{props.prop?.title}</p>
            <p className="text-[10px]">
              ⭐️{props.prop?.vote_average.toFixed(1)}/10
            </p>
            <p className="text-[10px] mt-2">
              {props.prop?.release_date.slice(0, 4)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
