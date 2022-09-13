import { useEffect, useState } from "react";
import {
  ITrending,
  ITrendingResult,
  ITrendingTime,
  ITrendingType,
} from "../interfaces/ITrending";
import { service } from "../services/api";

export function useTrendingMovieAndSeries() {
  const [trendingMovieAndSeries, setTrendingMovieAndSeries] =
    useState<ITrendingResult[]>();

  async function getTrending(
    type: ITrendingType,
    time: ITrendingTime
  ): Promise<ITrendingResult[]> {
    const trendingData: ITrending = await service
      .get<Promise<ITrending>>(`/trending/${type}/${time}`)
      .then((response) => {
        return response.data;
      });
    return trendingData.results;
  }

  async function fetchOverview() {
    const trending = await getTrending("movie", "week");

    if (trending) {
      setTrendingMovieAndSeries(trending);
    }
  }
  useEffect(() => {
    fetchOverview();
  }, []);

  console.log("useTrendingMovieAndSeries");

  return {
    trendingMovieAndSeries,
  };
}
