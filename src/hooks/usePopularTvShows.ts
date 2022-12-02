import { useEffect, useRef, useState } from "react";
import {
  IPopularTvShowsApiReturn,
  IPopularTvShowsResults,
} from "../interfaces/IPopularTvShows";

import { service } from "../services/api";

export function usePopularTvShows() {
  const [featuredPopularTvShow, setFeaturedPopularTvShow] = useState<
    IPopularTvShowsResults | undefined
  >(undefined);

  const [popularTvShowsWithoutFeatured, setPopularTvShowsWithoutFeatured] =
    useState<IPopularTvShowsResults[] | undefined>(undefined);

  const shouldUpdateState = useRef<boolean>(true);

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
    const popular: IPopularTvShowsResults[] = await getPopularTvShows();

    if (popular) {
      let randomNumber: number = Math.floor(Math.random() * popular.length);
      let popularFeaturedTvShow: IPopularTvShowsResults = popular[randomNumber];

      while (
        !popularFeaturedTvShow.backdrop_path ||
        popularFeaturedTvShow.vote_average.toFixed(1) === "0.0" ||
        !popularFeaturedTvShow.overview
      ) {
        randomNumber = Math.floor(Math.random() * popular.length);
        popularFeaturedTvShow = popular[randomNumber];
      }

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
    if (shouldUpdateState.current) {
      shouldUpdateState.current = false;
      populatePopularTvShowsStates();
    }
  }, []);

  return {
    featuredPopularTvShow,
    popularTvShowsWithoutFeatured,
  };
}
