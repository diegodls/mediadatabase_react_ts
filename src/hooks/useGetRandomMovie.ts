import { useEffect, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";

import {
  IDiscoveryMovies,
  IDiscoveryMoviesResult,
} from "../interfaces/IDiscoveryMovies";
import { IGenres } from "../interfaces/IGenres";
import { Genre } from "../interfaces/IMovieDetails";
import { service } from "../services/api";

export function useGetRandomMovie<T>() {
  const URL_DISCOVERY_BY_GENRES =
    "discover/movie?sort_by=popularity.desc&include_adult=false&page=1&with_genres=";

  const [randomMovie, setRandomMovie] = useState<IDiscoveryMoviesResult>();
  const [loadingRandomMovie, setLoadingRandomMovie] = useState<boolean>(true);
  const [randomMovieError, setRandomMovieError] =
    useState<IErrorFetchContent>();

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

    const moviesGenres: IGenres | undefined = await service
      .get<IGenres>(`genre/movie/list`)
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

    if (moviesGenres && moviesGenres.genres.length > 0) {
      let randomNumberForGenres = Math.floor(
        Math.random() * moviesGenres.genres.length
      );

      randomGenre = moviesGenres.genres[randomNumberForGenres];
      console.log(`randomGenre`);
      console.log(randomGenre);
    }
    console.log(`${URL_DISCOVERY_BY_GENRES}${randomGenre.id}`);

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

    if (moviesByRandomGenre && moviesByRandomGenre.length > 0) {
      let randomMovieValid = {} as IDiscoveryMoviesResult;

      while (!randomMovieValid.overview) {
        let randomNumberFromGenres = Math.floor(
          Math.random() * moviesByRandomGenre.length
        );

        console.log(`randomNumberForGenres: ${randomNumberFromGenres}`);
        console.log(
          `${moviesByRandomGenre[randomNumberFromGenres].original_title} - ${moviesByRandomGenre[randomNumberFromGenres].genre_ids}`
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
