import { useEffect, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";

import {
  IDiscoveryMovies,
  IDiscoveryMoviesResult,
} from "../interfaces/IDiscoveryMovies";
import { IGenres } from "../interfaces/IGenres";
import { Genre } from "../interfaces/IMovieDetails";
import { service } from "../services/api";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";

type UseGetRandomByDiscovery = Omit<MediaTypes, "person">;

export function UseGetRandomByDiscovery(type: MediaTypes) {
  const MOVIE_URL_PARAMS = `?page=1&sort_by=popularity.desc&include_adult=false&with_genres=`;
  const TV_URL_PARAMS = `?page=1&sort_by=popularity.desc`;
  const URL_PARAMS = type === "movie" ? MOVIE_URL_PARAMS : TV_URL_PARAMS;
  const URL_DISCOVERY_BY_GENRES = `discover/${type}${URL_PARAMS}`;

  const ssss =
    "discover/tv?sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0";

  const [randomMovie, setRandomMovie] = useState<IDiscoveryMoviesResult>();
  const [loadingRandomMovie, setLoadingRandomMovie] = useState<boolean>(true);
  const [randomMovieError, setRandomMovieError] =
    useState<IErrorFetchContent>();

  async function getMovieGenres(
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

  async function getRandomMovieByGenre(
    randomGenre: Genre,
    isCurrentUrl: boolean
  ) {
    const moviesByRandomGenre: IDiscoveryMoviesResult[] | undefined =
      await service
        .get<IDiscoveryMovies>(`${URL_DISCOVERY_BY_GENRES}${randomGenre.id}`)
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

    return moviesByRandomGenre;
  }

  async function getRandomMovie() {
    setLoadingRandomMovie(true);
    setRandomMovieError(undefined);

    let isCurrentUrl: boolean = true;

    let randomGenre: Genre = {
      id: 28,
      name: "Ação",
    };

    if (
      !URL_DISCOVERY_BY_GENRES ||
      URL_DISCOVERY_BY_GENRES === undefined ||
      URL_DISCOVERY_BY_GENRES.length <= 0
    ) {
      setRandomMovieError({
        status_message: "É necessário informar a URL do conteúdo!",
        success: false,
        status_code: 404,
      });
      return;
    }

    const moviesGenres: IGenres | undefined = await getMovieGenres(
      isCurrentUrl
    ).then((res) => {
      if (res?.genres) {
        return res;
      }
    });

    if (moviesGenres && moviesGenres.genres.length > 0) {
      let randomNumberForGenres = Math.floor(
        Math.random() * moviesGenres.genres.length
      );

      randomGenre = moviesGenres.genres[randomNumberForGenres];
    }

    const moviesByRandomGenre: IDiscoveryMoviesResult[] | undefined =
      await getRandomMovieByGenre(randomGenre, isCurrentUrl).then((res) => {
        if (res) {
          return res;
        }
      });

    if (moviesByRandomGenre && moviesByRandomGenre.length > 0) {
      let randomMovieValid = {} as IDiscoveryMoviesResult;

      while (!randomMovieValid.overview) {
        let randomNumberFromGenres = Math.floor(
          Math.random() * moviesByRandomGenre.length
        );

        if (
          moviesByRandomGenre[randomNumberFromGenres].overview &&
          moviesByRandomGenre[randomNumberFromGenres].poster_path &&
          (moviesByRandomGenre[randomNumberFromGenres].title ||
            moviesByRandomGenre[randomNumberFromGenres].original_title)
        ) {
          randomMovieValid = moviesByRandomGenre[randomNumberFromGenres];
        }
      }

      setRandomMovie(randomMovieValid);
    }

    setLoadingRandomMovie(false);
    return () => {
      isCurrentUrl = false;
    };
  }

  useEffect(() => {
    getRandomMovie();
  }, []);

  return {
    randomMovie,
    loadingRandomMovie,
    randomMovieError,
    getRandomMovie,
  };
}
