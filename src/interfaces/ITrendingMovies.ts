import { MediaTypes } from "../types/sharedTypes/MediaTypes";
export interface ITrendingMovies {
  page: number;
  results: ITrendingMoviesResult[];
  total_pages: number;
  total_results: number;
}

export interface ITrendingMoviesResult {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: MediaTypes;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
