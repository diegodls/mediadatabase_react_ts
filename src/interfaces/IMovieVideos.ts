export interface IMovieVideos {
  id: number;
  results: IMovieVideoResults[];
}

export interface IMovieVideoResults {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
