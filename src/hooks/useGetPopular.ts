import { useEffect, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { service } from "../services/api";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";

interface IItemMockProps {
  backdrop_path?: string;
  vote_average?: number;
  overview?: string;
}

export function useGetPopular<T>(
  type: MediaTypes,
  splitFeaturedItem?: boolean
) {
  const [popularList, setPopularList] = useState<T[]>();
  const [loadingPopularList, setLoadingPopularList] = useState<boolean>(true);
  const [popularError, setPopularError] = useState<IErrorFetchContent>();

  const [popularItemFeatured, setPopularItemFeatured] = useState<T | undefined>(
    undefined
  );

  const [popularListWithoutItemFeatured, setPopularListWithoutItemFeatured] =
    useState<T[] | undefined>(undefined);

  function removeItemFromArray<T>(value: T, arr?: Array<T>): Array<T> | void {
    if (arr) {
      const index = arr.indexOf(value);

      if (index > -1) {
        arr.splice(index, 1);
      }

      return arr;
    }
  }

  async function populatePopularStates() {
    if (popularList) {
      let randomNumber: number = Math.floor(Math.random() * popularList.length);
      let featuredItem = popularList[randomNumber] as T & IItemMockProps;

      while (
        !featuredItem.backdrop_path ||
        featuredItem.vote_average?.toFixed(1) === "0.0" ||
        !featuredItem.overview
      ) {
        randomNumber = Math.floor(Math.random() * popularList.length);
        featuredItem = popularList[randomNumber] as T & IItemMockProps;
      }

      let popularTvShowsWithoutFeatured = removeItemFromArray<T>(
        featuredItem,
        popularList
      );

      if (popularTvShowsWithoutFeatured) {
        setPopularItemFeatured(featuredItem);
        setPopularListWithoutItemFeatured(popularTvShowsWithoutFeatured);
      }
    }
  }

  async function getPopular() {
    setLoadingPopularList(true);
    setPopularError(undefined);

    if (!type || type === undefined || type.length <= 0) {
      setPopularError({
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
          console.log("#".repeat(50));
          console.log(
            `useGetPopular - type: ${type} - ${
              splitFeaturedItem ? "É" : "Não é"
            } para dividir`
          );

          setPopularList(response.data.results);
        }
      })
      .catch((error: IErrorFetchContent) => {
        setPopularError(error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoadingPopularList(false);
        }, 500);
      });
  }

  useEffect(() => {
    getPopular();
  }, []);

  useEffect(() => {
    if (splitFeaturedItem && popularList) {
      populatePopularStates();
    }
  }, [popularList]);

  return {
    popularList,
    loadingPopularList,
    popularError,
    popularItemFeatured,
    popularListWithoutItemFeatured,
    getPopular,
  };
}
