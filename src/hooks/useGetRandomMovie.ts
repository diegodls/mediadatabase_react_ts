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

interface UseGetRandomByDiscovery<T extends TRandomContentState> {
  randomContent: T | undefined;
  loadingRandomContent: boolean;
  randomContentError?: IErrorFetchContent;
  getRandomContent: () => void;
}

export function useGetRandomByDiscovery<T extends TRandomContentState>(
  type: MediaTypes
): UseGetRandomByDiscovery<T> {
  const MOVIE_URL_PARAMS = `?page=1&sort_by=popularity.desc&include_adult=false&with_genres=`;
  const TV_URL_PARAMS = `?page=1&sort_by=popularity.desc&include_adult=false&with_genres=`;
  const URL_PARAMS = type == "movie" ? MOVIE_URL_PARAMS : TV_URL_PARAMS;
  const URL_DISCOVERY_BY_GENRES = `discover/${type}${URL_PARAMS}`;

  const ssss =
    "discover/tv?sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0";

  const [randomContent, setRandomContent] = useState<T>();
  const [loadingRandomContent, setLoadingRandomContent] =
    useState<boolean>(true);
  const [randomContentError, setRandomContentError] =
    useState<IErrorFetchContent>();

  async function getContentGenres(
    isCurrentUrl: boolean
  ): Promise<IGenres | undefined> {
    const moviesGenres: IGenres | undefined = await service
      .get<IGenres>(`genre/${type}/list`)
      .then((response) => {
        if (response.data && isCurrentUrl) {
          return response.data;
        }
      })
      .catch((error: IErrorFetchContent) => {
        console.log(
          `Erro ao localizar os gêneros dos filmes: ${error.status_message}`
        );
        throw new Error(error.status_message);
      });

    return moviesGenres;
  }

  async function getRandomContentByGenre(
    randomGenre: Genre,
    isCurrentUrl: boolean
  ): Promise<TRandomContentState[] | undefined> {
    return await service
      .get<IDiscoveryMovies | IDiscoveryTv>(
        `${URL_DISCOVERY_BY_GENRES}${randomGenre.id}`
      )
      .then((response) => {
        if (response.data.results && isCurrentUrl) {
          return response.data.results;
        }
      })
      .catch((error: IErrorFetchContent) => {
        console.log(
          `Erro ao localizar os filmes pelo gênero: ${randomGenre.id} - ${randomGenre.name} : ${error.status_message}`
        );
        throw new Error(error.status_message);
      });
  }

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

    const contentGenres: IGenres | undefined = await getContentGenres(
      isCurrentUrl
    ).then((res) => {
      if (res?.genres) {
        return res;
      }
    });

    if (contentGenres && contentGenres.genres.length > 0) {
      let randomNumberForGenres = randomNumberFromArrayLength<IGenre>(
        contentGenres.genres
      );

      randomGenre = contentGenres.genres[randomNumberForGenres];
    }

    const moviesByRandomGenre = (await getRandomContentByGenre(
      randomGenre,
      isCurrentUrl
    ).then((res) => {
      if (res) {
        return res;
      }
    })) as T[];

    if (moviesByRandomGenre && moviesByRandomGenre.length > 0) {
      let randomContentValid = {} as T;

      let count = 0;

      while (!randomContentValid?.overview) {
        console.log(``);
        console.log(`while - count: ${count}`);
        count += 1;

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

        console.log(`name: ${hasSomeName}`);

        console.log(`title: ${hasSomeTitle}`);

        console.log(
          `overview: ${
            "overview" in moviesByRandomGenre[randomNumberFromGenres]
          }`
        );

        console.log(`isValid: ${isValidContent ? "true" : "false"}`);

        if (isValidContent) {
          randomContentValid = moviesByRandomGenre[randomNumberFromGenres];
          console.log(randomContentValid);
        }
      }

      setRandomContent(randomContentValid);
    }

    setLoadingRandomContent(false);
    return () => {
      isCurrentUrl = false;
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
