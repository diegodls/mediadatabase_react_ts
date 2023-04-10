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

interface IUsePopular<T> {
  popularDataWithFeaturedItem?: T[];
  popularDataWithoutFeaturedItem?: T[];
  popularFeaturedItem?: T;
  loadingPopularData?: boolean;
  popularDataError?: IErrorFetchContent;
  populatePopularStates: () => void;
}

interface IHandleData<T> {
  featuredItem: T | undefined;
  dataWithFeaturedItem: T[] | undefined;
  dataWithoutFeaturedItem: T[] | undefined;
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

function checkForAValidItem<T extends TPopularResults>(
  data: T[]
): T | undefined {
  let dataWithFeaturedItem: T[] = data;

  for (let item in dataWithFeaturedItem) {
    if (
      !dataWithFeaturedItem[item].backdrop_path ||
      !dataWithFeaturedItem[item].overview ||
      dataWithFeaturedItem[item].vote_average?.toFixed(1) === "0.0"
    ) {
      let dataWithoutItem = removeItemFromArray<T>(
        dataWithFeaturedItem[item],
        dataWithFeaturedItem
      );

      if (dataWithoutItem && dataWithoutItem.length > 0) {
        dataWithFeaturedItem = dataWithoutItem;
      }
    } else {
      return dataWithFeaturedItem[item];
    }
  }
}

async function handleData<T extends TPopularResults>(
  type: MediaTypes
): Promise<IHandleData<T>> {
  let page: number = 1;

  let dataWithFeaturedItem: T[] | undefined = undefined;

  let dataWithoutFeaturedItem: T[] | undefined = undefined;

  let featuredItem: T | undefined = undefined;

  do {
    dataWithFeaturedItem = (await fetchData(
      `/${type}/popular?page=${page}`
    )) as T[];

    page += 1;

    featuredItem = checkForAValidItem<T>(dataWithFeaturedItem);
  } while (!featuredItem);

  dataWithoutFeaturedItem = removeItemFromArray<T>(
    featuredItem,
    dataWithFeaturedItem
  );

  return { featuredItem, dataWithFeaturedItem, dataWithoutFeaturedItem };
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
    let isCurrentUrl: boolean = true;

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

    try {
      const { featuredItem, dataWithFeaturedItem, dataWithoutFeaturedItem } =
        await handleData<T>(type);

      if (
        featuredItem &&
        dataWithFeaturedItem &&
        dataWithoutFeaturedItem &&
        isCurrentUrl
      ) {
        setPopularDataWithFeaturedItem(dataWithFeaturedItem);
        setPopularFeaturedItem(featuredItem);
        setPopularDataWithoutFeaturedItem(dataWithoutFeaturedItem);
      }
    } catch (error) {
      setPopularDataError({
        status_message: `Não foi possível localizar os conteúdos. Erro: ${error}`,
        success: false,
        status_code: 404,
      });
      return;
    } finally {
      setLoadingPopularData(false);
    }

    return () => {
      isCurrentUrl = false;
      setLoadingPopularData(false);
    };
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
}
