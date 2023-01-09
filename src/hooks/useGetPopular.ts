import { useEffect, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import {
  IPopularMoviesApiReturn,
  IPopularMoviesResults,
} from "../interfaces/IPopularMovies";
import { service } from "../services/api";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";

export function useGetPopular(type: MediaTypes) {
  const [popular, setPopular] = useState<IPopularMoviesResults[]>();
  const [loadingPopular, setLoadingPopular] = useState<boolean>(true);
  const [popularError, setPopularError] = useState<IErrorFetchContent>();

  async function getPopular() {
    setLoadingPopular(true);
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
      .get<IPopularMoviesApiReturn>(`/${type}/popular`)
      .then((response) => {
        if (response.data) {
          setPopular(response.data.results);
        }
      })
      .catch((error: IErrorFetchContent) => {
        setPopularError(error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoadingPopular(false);
        }, 500);
      });
  }

  useEffect(() => {
    getPopular();
  }, []);

  return {
    popular,
    loadingPopular,
    popularError,
    getPopular,
  };
}
