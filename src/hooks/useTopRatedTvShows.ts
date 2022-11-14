import { useEffect, useState } from "react";
import {
  ITopRatedTvShowsApiReturn,
  ITopRatedTvShowsResults,
} from "../interfaces/ITopRatedTvShows";

import { service } from "../services/api";

export function useTopRatedTvShows() {
  const [topRatedTvShows, setTopRatedTvShows] =
    useState<ITopRatedTvShowsResults[]>();

  async function getTopRated(): Promise<ITopRatedTvShowsResults[]> {
    const topRatedTvShowsData: ITopRatedTvShowsApiReturn = await service
      .get<Promise<ITopRatedTvShowsApiReturn>>(`/tv/top_rated`)
      .then((response) => {
        return response.data;
      });

    return topRatedTvShowsData.results;
  }

  async function fetchTopRated() {
    const topRatedTvShowsFetchData = await getTopRated();

    if (topRatedTvShowsFetchData) {
      setTopRatedTvShows(topRatedTvShowsFetchData);
    }
  }
  useEffect(() => {
    fetchTopRated();
  }, []);

  return {
    topRatedTvShows,
  };
}
