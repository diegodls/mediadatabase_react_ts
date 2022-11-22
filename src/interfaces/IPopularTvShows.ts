export interface IPopularTvShowsApiReturn {
  page: number;
  results: IPopularTvShowsResults[];
  total_pages: number;
  total_results: number;
}

export interface IPopularTvShowsResults {
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}
