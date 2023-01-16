export interface IRecommendedApiReturn {
  page: number;
  results: IRecommendedResult[];
  total_pages: number;
  total_results: number;
}

export interface IRecommendedResult {
  adult: boolean;
  backdrop_path: any;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: any;
  popularity: number;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
