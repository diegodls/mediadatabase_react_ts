import { useEffect, useState } from "react";
import { IGenres } from "../interfaces/IGenres";

import { service } from "../services/api";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";

export function useGenres() {
  const [movieGenresList, setMovieGenresList] = useState<IGenres>();
  const [tvShowsGenresList, setTvShowsGenresList] = useState<IGenres>();

  async function getGenre(type: MediaTypes): Promise<IGenres> {
    const genresData: IGenres = await service
      .get<Promise<IGenres>>(`genre/${type}/list`)
      .then((response) => {
        return response.data;
      });
    return genresData;
  }

  async function fetchMovieGenres() {
    const genres = await getGenre("movie");

    if (genres) {
      setMovieGenresList(genres);
    }
  }

  async function fetchTVGenres() {
    const genres = await getGenre("tv");

    if (genres) {
      setTvShowsGenresList(genres);
    }
  }

  useEffect(() => {
    fetchMovieGenres();
    fetchTVGenres();
  }, []);

  return {
    movieGenresList,
    tvShowsGenresList,
  };
}
