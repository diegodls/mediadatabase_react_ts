import { useEffect, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { service } from "../services/api";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";
import { removeItemFromArray } from "../utils/removeItemFromArray";

interface IItemMockProps {
  backdrop_path?: string;
  vote_average?: number;
  overview?: string;
}

interface IUsePopularFunctionsProps {
  splitFeaturedItem?: boolean;
}

export function usePopular<T>(
  type: MediaTypes,
  { splitFeaturedItem }: IUsePopularFunctionsProps
) {
  const [data, setData] = useState<T[]>();

  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [dataError, setDataError] = useState<IErrorFetchContent>();

  const [dataItemFeatured, setDataItemFeatured] = useState<T | undefined>(
    undefined
  );

  const [dataWithoutItemFeatured, setDataWithoutItemFeatured] = useState<
    T[] | undefined
  >(undefined);

  async function populateFeaturedStates() {
    if (data) {
      let randomNumber: number = Math.floor(Math.random() * data.length);
      let featuredItem = data[randomNumber] as T & IItemMockProps;

      while (
        !featuredItem.backdrop_path ||
        featuredItem.vote_average?.toFixed(1) === "0.0" ||
        !featuredItem.overview
      ) {
        randomNumber = Math.floor(Math.random() * data.length);
        featuredItem = data[randomNumber] as T & IItemMockProps;
      }

      let popularTvShowsWithoutFeatured = removeItemFromArray<T>(
        featuredItem,
        data
      );

      if (popularTvShowsWithoutFeatured) {
        setDataItemFeatured(featuredItem);
        setDataWithoutItemFeatured(popularTvShowsWithoutFeatured);
      }
    }
  }

  async function getPopular() {
    setLoadingData(true);
    setDataError(undefined);

    if (!type || type === undefined || type.length <= 0) {
      setDataError({
        status_message: "É necessário informar o ID do conteúdo!",
        success: false,
        status_code: 404,
      });

      return;
    }

    return await service
      .get(`/${type}/popular`)
      .then((response) => {
        if (response.data) {
          setData(response.data.results);
        }
      })
      .catch((error: IErrorFetchContent) => {
        setDataError(error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoadingData(false);
        }, 500);
      });
  }

  useEffect(() => {
    getPopular();
  }, []);

  useEffect(() => {
    if (splitFeaturedItem && data) {
      populateFeaturedStates();
    }
  }, [data]);

  return {
    data,
    loadingData,
    dataError,
    dataItemFeatured,
    dataWithoutItemFeatured,
    getPopular,
  };
}
