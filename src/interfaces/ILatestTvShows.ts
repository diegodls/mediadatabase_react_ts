export interface ILatestTvShows {
  backdrop_path: any;
  created_by: any[];
  episode_run_time: number[];
  first_air_date: string;
  genres: ILatestTvShowsGenres[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  name: string;
  networks: ILatestTvShowsNetworks[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: any;
  popularity: number;
  poster_path: any;
  production_companies: any[];
  seasons: ILatestTvShowsSeasons[];
  status: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface ILatestTvShowsGenres {
  id: number;
  name: string;
}

export interface ILatestTvShowsNetworks {
  id: number;
  name: string;
}

export interface ILatestTvShowsSeasons {
  air_date: string;
  episode_count: number;
  id: number;
  poster_path: any;
  season_number: number;
}
