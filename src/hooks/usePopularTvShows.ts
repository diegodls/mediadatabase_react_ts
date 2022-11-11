import { useEffect, useState } from "react";
import {
  IPopularTvShowsApiReturn,
  IPopularTvShowsResults,
} from "../interfaces/IPopularTvShows";

import { service } from "../services/api";

export function usePopularTvShows() {
  const [popularTvShows, setPopularTvShows] =
    useState<IPopularTvShowsResults[]>();

  async function getPopular(): Promise<IPopularTvShowsResults[]> {
    const popularData: IPopularTvShowsApiReturn = await service
      .get<Promise<IPopularTvShowsApiReturn>>(`/tv/popular`)
      .then((response) => {
        return response.data;
      });

    return popularData.results;
  }

  async function fetchPopular() {
    const popular = await getPopular();

    if (popular) {
      setPopularTvShows(popular);
    }
  }
  useEffect(() => {
    fetchPopular();
  }, []);

  return {
    popularTvShows,
  };
}
