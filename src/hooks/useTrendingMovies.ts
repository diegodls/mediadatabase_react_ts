import { useEffect, useState } from "react";
import {
  ITrendingMovies,
  ITrendingMoviesResult,
  ITrendingMoviesTime,
  ITrendingMoviesType,
} from "../interfaces/ITrendingMovies";
import { service } from "../services/api";

export function useTrendingMovies() {
  const [trendingMovies, setTrendingMovies] =
    useState<ITrendingMoviesResult[]>();

  async function getTrending(
    type: ITrendingMoviesType,
    time: ITrendingMoviesTime
  ): Promise<ITrendingMoviesResult[]> {
    const trendingData: ITrendingMovies = await service
      .get<Promise<ITrendingMovies>>(`/trending/${type}/${time}`)
      .then((response) => {
        return response.data;
      });

    console.log("trendingData.results");
    console.log(trendingData.results.length);

    return trendingData.results;
  }

  async function fetchOverview(
    type: ITrendingMoviesType,
    time: ITrendingMoviesTime
  ) {
    const trending = await getTrending(type, time);

    if (trending) {
      setTrendingMovies(trending);
    }
  }
  useEffect(() => {
    fetchOverview("movie", "week");
  }, []);

  console.log("useTrendingMovies");

  return {
    trendingMovies,
  };
}
