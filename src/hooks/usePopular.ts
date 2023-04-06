import { useEffect, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import {
  IPopularMoviesApiReturn,
  IPopularMoviesResults,
} from "../interfaces/IPopularMovies";
import {
  IPopularTvShowsApiReturn,
  IPopularTvShowsResults,
} from "../interfaces/IPopularTvShows";
import { service } from "../services/api";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";
import { removeItemFromArray } from "../utils/removeItemFromArray";

type TPopularApiReturn = IPopularMoviesApiReturn | IPopularTvShowsApiReturn;

type TPopularResults = IPopularMoviesResults | IPopularTvShowsResults;

interface IUsePopular<TPR> {
  popularDataWithFeaturedItem?: TPR[];
  popularDataWithoutFeaturedItem?: TPR[];
  popularFeaturedItem?: TPR;
  loadingPopularData?: boolean;
  popularDataError?: IErrorFetchContent;
  populatePopularStates: () => void;
}

interface IHandleData<TPR> {
  dataWithFeaturedItem: TPR[] | undefined;
}

async function fetchData(url: string): Promise<TPopularResults[]> {
  return await service.get<TPopularApiReturn>(url).then((response) => {
    if (response.status === 200 && response.data) {
      return response.data.results;
    } else {
      throw new Error(`Não foi possível buscar os dados usando a url: ${url}`);
    }
  });
}

async function handleData<T extends TPopularResults>(
  type: MediaTypes
): Promise<IHandleData<T>> {
  //fazer essa função receber o tipo, gerenciar a paginação em caso de não encontrar conteúdo que satisfaça (sem overview, sem back_drop e etc...), montar a url com o page e etc...
  let page = 1;
  let isValidItem: boolean = false;

  let dataWithFeaturedItem = await fetchData(`/${type}/popular?page=${page}`);
  let dataWithoutFeaturedItem = [...dataWithFeaturedItem];
  let featuredItem = {} as TPopularResults;

  while (!isValidItem) {
    for (let item in dataWithoutFeaturedItem) {
      if (
        !dataWithoutFeaturedItem[item].backdrop_path ||
        !dataWithoutFeaturedItem[item].overview ||
        dataWithoutFeaturedItem[item].vote_average?.toFixed(1) === "0.0"
      ) {
        let rawDataCheckedWithoutItem = removeItemFromArray<TPopularResults>(
          dataWithoutFeaturedItem[item],
          dataWithoutFeaturedItem
        );

        if (rawDataCheckedWithoutItem && rawDataCheckedWithoutItem.length > 0) {
          dataWithoutFeaturedItem = rawDataCheckedWithoutItem;
        } else {
          page += 1;
          dataWithFeaturedItem = await fetchData(
            `/${type}/popular?page=${page}`
          );
          dataWithoutFeaturedItem = [...dataWithFeaturedItem];
        }
      } else {
        featuredItem = dataWithoutFeaturedItem[item];

        let rawDataCheckedWithoutItem = removeItemFromArray<TPopularResults>(
          dataWithoutFeaturedItem[item],
          dataWithoutFeaturedItem
        );

        if (rawDataCheckedWithoutItem && rawDataCheckedWithoutItem.length > 0) {
          dataWithoutFeaturedItem = rawDataCheckedWithoutItem;
        } else {
          dataWithoutFeaturedItem = dataWithFeaturedItem;
        }

        isValidItem = true;
      }
    }
  }

  return dataWithFeaturedItem;
}

export function usePopular<T extends TPopularResults>(
  type: MediaTypes
): IUsePopular<T> {
  const [popularDataWithFeaturedItem, setPopularDataWithFeaturedItem] =
    useState<T[] | undefined>();

  const [loadingPopularData, setLoadingPopularData] = useState<boolean>(true);

  const [popularDataError, setPopularDataError] =
    useState<IErrorFetchContent>();

  const [popularFeaturedItem, setPopularFeaturedItem] = useState<T>();

  const [popularDataWithoutFeaturedItem, setPopularDataWithoutFeaturedItem] =
    useState<T[]>();

  async function populatePopularStates() {
    setLoadingPopularData(true);
    setPopularDataError(undefined);

    if (!type || type === undefined || type.length <= 0) {
      setPopularDataError({
        status_message: "É necessário informar o tipo do conteúdo!",
        success: false,
        status_code: 400,
      });

      setLoadingPopularData(false);
      throw new Error(
        `Não foi possível localizar os populares do tipo: ${type}`
      );
    }

    const dataWithFeaturedItem = await handleData<T>(type);

    if (dataWithFeaturedItem) {
      setPopularDataWithFeaturedItem(dataWithFeaturedItem);
    }
  }

  useEffect(() => {
    populatePopularStates();
  }, []);

  return {
    popularDataWithFeaturedItem,
    popularDataWithoutFeaturedItem,
    popularFeaturedItem,
    loadingPopularData,
    popularDataError,
    populatePopularStates,
  };

  /*---------------------------------------------------

  async function populateFeaturedStates() {
    console.log(`${"@".repeat(25)}=> usePopular populateFeaturedStates()`);

    if (data) {
      let randomNumber: number = Math.floor(Math.random() * data.length);
      let featuredItem = data[randomNumber] as T & IItemMockProps;

      while (
        !featuredItem.backdrop_path ||
        featuredItem.vote_average?.toFixed(1) === "0.0" ||
        !featuredItem.overview
      ) {
        console.log(
          `${"@".repeat(
            25
          )}=> usePopular populateFeaturedStates() => while => featuredItem`
        );

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
    console.log(`${"@".repeat(25)}=> usePopular getPopular()`);

    setLoadingData(true);
    setDataError(undefined);

    return await service
      .get(`/${type}/popular?page=4`)
      .then((response) => {
        if (response.data) {
          console.log(
            `${"@".repeat(25)}=> usePopular getPopular() => response.data`
          );
          console.log(response.data);

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
*/
}
