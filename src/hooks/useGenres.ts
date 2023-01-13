import { useEffect, useState } from "react";

import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { service } from "../services/api";
import { GenresMediaTypes } from "../types/sharedTypes/MediaTypes";

export function useGenres<T>(type: GenresMediaTypes) {
  const [genresList, setGenresList] = useState<T>();
  const [genresListError, setGenresListError] = useState<IErrorFetchContent>();
  const [loadingGenresList, setLoadingGenresList] = useState<boolean>(true);

  async function getGenres() {
    setLoadingGenresList(true);
    return await service
      .get<T>(`genre/${type}/list`)
      .then((response) => {
        if (response.data) {
          setGenresList(response.data);
        }
      })
      .catch((error) => {
        setGenresListError(error);
      })
      .finally(() => {
        setLoadingGenresList(false);
      });
  }

  useEffect(() => {
    getGenres();
  }, []);

  return {
    genresList,
    genresListError,
    loadingGenresList,
    getGenres,
  };
}
