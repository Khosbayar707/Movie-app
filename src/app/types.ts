export type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type Paged<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type Video = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export type CrewMember = {
  id: number;
  name: string;
  job: string;
  department: string;
};

export type MovieDetails = Omit<Movie, "genre_ids"> & {
  genres: Genre[];
  runtime: number | null;
  tagline: string | null;
  credits?: { cast: CastMember[]; crew: CrewMember[] };
  videos?: { results: Video[] };
  recommendations?: Paged<Movie>;
};
