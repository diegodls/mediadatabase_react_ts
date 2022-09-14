import { useEffect, useState } from "react";
import {
  ITrending,
  ITrendingResult,
  ITrendingTime,
  ITrendingType,
} from "../interfaces/ITrending";
import { service } from "../services/api";

export function useTrendingMovies() {
  const [trendingMovies, setTrendingMovies] = useState<ITrendingResult[]>();

  async function getTrending(
    type: ITrendingType,
    time: ITrendingTime
  ): Promise<ITrendingResult[]> {
    const trendingData: ITrending = await service
      .get<Promise<ITrending>>(`/trending/${type}/${time}`)
      .then((response) => {
        return response.data;
      });

    console.log("trendingData.results");
    console.log(trendingData.results.length);

    return trendingData.results;
  }

  async function fetchOverview(type: ITrendingType, time: ITrendingTime) {
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
