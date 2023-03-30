import { useEffect, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";

import {
  IDiscoveryMovies,
  IDiscoveryMoviesResult,
} from "../interfaces/IDiscoveryMovies";
import { IDiscoveryTv, IDiscoveryTvResult } from "../interfaces/IDiscoveryTv";
import { IGenre, IGenres } from "../interfaces/IGenres";
import { Genre } from "../interfaces/IMovieDetails";
import { service } from "../services/api";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";
import { movieGenresMock, tvGenresMock } from "../utils/Genres";
import { randomNumberFromArrayLength } from "../utils/randomNumberFromArrayLength";

type TRandomContentState = IDiscoveryMoviesResult | IDiscoveryTvResult;

interface UseGetRandomByDiscovery<T> {
  randomContent: T | undefined;
  loadingRandomContent: boolean;
  randomContentError?: IErrorFetchContent;
  getRandomContent: () => void;
}

async function getContentGenres(type: MediaTypes): Promise<IGenres> {
  return await service.get<IGenres>(`genre/${type}/list`).then((response) => {
    return response.data;
  });
}

async function getRandomContentByGenre(
  url: string
): Promise<TRandomContentState[]> {
  return await service
    .get<IDiscoveryMovies | IDiscoveryTv>(url)
    .then((response) => {
      return response.data.results;
    });
}

export function useGetRandomByDiscovery<T extends TRandomContentState>(
  type: MediaTypes
): UseGetRandomByDiscovery<T> {
  const MOVIE_URL_PARAMS = `?page=1&sort_by=popularity.desc&include_adult=false&with_genres=`;
  const TV_URL_PARAMS = `?page=1&sort_by=popularity.desc&include_adult=false&with_genres=`;
  const URL_PARAMS = type == "movie" ? MOVIE_URL_PARAMS : TV_URL_PARAMS;
  const URL_DISCOVERY_BY_GENRES = `discover/${type}${URL_PARAMS}`;

  const [randomContent, setRandomContent] = useState<T>();
  const [loadingRandomContent, setLoadingRandomContent] =
    useState<boolean>(true);
  const [randomContentError, setRandomContentError] =
    useState<IErrorFetchContent>();

  async function getRandomContent() {
    setLoadingRandomContent(true);
    setRandomContentError(undefined);

    let isCurrentUrl: boolean = true;

    const randomNumberFromMockGenres = randomNumberFromArrayLength<IGenre>(
      type == "movie" ? movieGenresMock : tvGenresMock
    );

    let randomGenre: Genre =
      type == "movie"
        ? movieGenresMock[randomNumberFromMockGenres]
        : tvGenresMock[randomNumberFromMockGenres];

    if (
      !URL_DISCOVERY_BY_GENRES ||
      URL_DISCOVERY_BY_GENRES === undefined ||
      URL_DISCOVERY_BY_GENRES.length <= 0
    ) {
      setRandomContentError({
        status_message: "É necessário informar a URL do conteúdo!",
        success: false,
        status_code: 404,
      });
      return;
    }

    const contentGenres: IGenres = await getContentGenres(type);

    if (contentGenres && contentGenres.genres.length > 0) {
      let randomNumberForGenres = randomNumberFromArrayLength<IGenre>(
        contentGenres.genres
      );
      randomGenre = contentGenres.genres[randomNumberForGenres];
    }

    const moviesByRandomGenre = (await getRandomContentByGenre(
      `${URL_DISCOVERY_BY_GENRES}${randomGenre.id}`
    )) as T[];

    if (moviesByRandomGenre && moviesByRandomGenre.length > 0) {
      let randomContentValid = {} as T;

      while (!randomContentValid?.overview) {
        let randomNumberFromGenres =
          randomNumberFromArrayLength<T>(moviesByRandomGenre);

        let hasOverview: boolean =
          "overview" in moviesByRandomGenre[randomNumberFromGenres];

        let hasPosterPath: boolean =
          "poster_path" in moviesByRandomGenre[randomNumberFromGenres];

        let hasSomeTitle: boolean =
          ("title" || "original_title") in
          moviesByRandomGenre[randomNumberFromGenres];

        let hasSomeName: boolean =
          ("name" || "original_name") in
          moviesByRandomGenre[randomNumberFromGenres];

        let isValidContent: boolean =
          hasOverview && hasPosterPath && (hasSomeTitle || hasSomeName);

        if (isValidContent) {
          randomContentValid = moviesByRandomGenre[randomNumberFromGenres];
        }
      }

      if (isCurrentUrl) {
        setRandomContent(randomContentValid);
      }
    }

    setLoadingRandomContent(false);
    return () => {
      isCurrentUrl = false;
      setLoadingRandomContent(false);
    };
  }

  useEffect(() => {
    getRandomContent();
  }, []);

  return {
    randomContent,
    loadingRandomContent,
    randomContentError,
    getRandomContent,
  };
}
