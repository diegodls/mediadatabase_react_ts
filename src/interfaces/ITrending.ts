export type ITrendingType = "all" | "movie" | "person" | "tv";
export type ITrendingTime = "day" | "week";

export interface ITrending {
  page: number;
  results: ITrendingResult[];
  total_pages: number;
  total_results: number;
}

export interface ITrendingResult {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
