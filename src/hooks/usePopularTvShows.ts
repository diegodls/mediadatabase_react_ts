import { useEffect, useState } from "react";
import {
  IPopularTvShowsApiReturn,
  IPopularTvShowsResults,
} from "../interfaces/IPopularTvShows";

import { service } from "../services/api";

export function usePopularTvShows() {
  const [FeaturedPopularTvShow, setFeaturedPopularTvShow] =
    useState<IPopularTvShowsResults>();

  const [popularTvShowsWithoutFeatured, setPopularTvShowsWithoutFeatured] =
    useState<IPopularTvShowsResults[]>();

  async function getPopularTvShows(): Promise<IPopularTvShowsResults[]> {
    const popularData: IPopularTvShowsApiReturn = await service
      .get<Promise<IPopularTvShowsApiReturn>>(`/tv/popular`)
      .then((response) => {
        return response.data;
      });

    return popularData.results;
  }

  function removeFeaturedTvShowItem<T>(arr: Array<T>, value: T): Array<T> {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  async function populatePopularTvShowsStates() {
    const popular = await getPopularTvShows();

    if (popular) {
      let randomNumber = Math.floor(Math.random() * popular.length);
      let popularFeaturedTvShow = popular[randomNumber];

      let popularTvShowsWithoutFeatured =
        removeFeaturedTvShowItem<IPopularTvShowsResults>(
          popular,
          popularFeaturedTvShow
        );

      setFeaturedPopularTvShow(popularFeaturedTvShow);
      setPopularTvShowsWithoutFeatured(popularTvShowsWithoutFeatured);
    }
  }

  useEffect(() => {
    populatePopularTvShowsStates();
  }, []);

  return {
    FeaturedPopularTvShow,
    popularTvShowsWithoutFeatured,
  };
}
