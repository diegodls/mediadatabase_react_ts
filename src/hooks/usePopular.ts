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

type TDiscovery = IPopularMoviesResults | IPopularTvShowsResults;
type TPopularTvShowsApiReturn =
  | IPopularMoviesApiReturn
  | IPopularTvShowsApiReturn;

interface IItemMockProps {
  backdrop_path?: string;
  vote_average?: number;
  overview?: string;
}

interface IUsePopularFunctionsProps {
  splitFeaturedItem?: boolean;
}

interface IHandleData {
  a: string;
}

interface IUsePopularReturn<T, P> {
  data: T | undefined;
  loadingData: boolean;
  dataItemFeatured: P | undefined;
  dataWithoutItemFeatured: P[] | undefined;
  dataError?: IErrorFetchContent;
  populatePopularStates: () => void;
}

async function fetchData<T>(url: string): Promise<T | undefined> {
  return await service.get<T>(url).then((response) => {
    return response.data;
  });
}

function handleData<T, P>(type: MediaTypes): IHandleData {
  let a: string = "A";
  return {
    a,
  };
}

export function usePopular<T, P>(
  type: MediaTypes,
  { splitFeaturedItem }: IUsePopularFunctionsProps
): IUsePopularReturn<T, P> {
  const [data, setData] = useState<T | undefined>();

  const [loadingData, setLoadingData] = useState<boolean>(true);

  const [dataError, setDataError] = useState<IErrorFetchContent>();

  const [dataItemFeatured, setDataItemFeatured] = useState<P | undefined>(
    undefined
  );

  const [dataWithoutItemFeatured, setDataWithoutItemFeatured] = useState<
    P[] | undefined
  >(undefined);

  async function populatePopularStates() {
    setLoadingData(true);
    setDataError(undefined);

    if (!type || type === undefined || type.length <= 0) {
      setDataError({
        status_message: "É necessário informar o tipo do conteúdo!",
        success: false,
        status_code: 404,
      });

      setLoadingData(false);
      throw new Error(
        `Não foi possível localizar os populares do tipo: ${type}`
      );
    }

    let page = 1;

    const popularContent: Promise<IPopularTvShowsApiReturn | undefined> =
      fetchData<IPopularTvShowsApiReturn>(`/${type}/popular?page=${page}`);
  }

  useEffect(() => {
    populatePopularStates();
  }, []);
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

  return {
    data,
    loadingData,
    dataError,
    dataItemFeatured,
    dataWithoutItemFeatured,
    populatePopularStates,
  };
}
