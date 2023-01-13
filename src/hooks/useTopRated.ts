import { useEffect, useState } from "react";

import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { service } from "../services/api";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";

interface ApiTopRatedResponse<T> {
  page: number;
  results: T[];
  total_results: number;
  total_pages: number;
}

export function useTopRated<T>(type: MediaTypes) {
  const [topRated, setTopRated] = useState<T[]>();
  const [loadingTopRated, setLoadingTopRated] = useState<boolean>(true);
  const [topRatedError, setTopRatedError] = useState<IErrorFetchContent>();

  async function getTopRated() {
    setLoadingTopRated(true);
    setTopRatedError(undefined);

    if (!type || type === undefined) {
      setTopRatedError({
        status_message: "É necessário informar o tipo do conteúdo!",
        success: false,
        status_code: 404,
      });

      return;
    }

    return await service
      .get<ApiTopRatedResponse<T>>(`/${type}/top_rated`)
      .then((response) => {
        if (response.data) {
          setTopRated(response.data.results);
        }
      })
      .catch((error: IErrorFetchContent) => {
        setTopRatedError(error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoadingTopRated(false);
        }, 500);
      });
  }

  useEffect(() => {
    getTopRated();
  }, []);

  return {
    topRated,
    loadingTopRated,
    topRatedError,
  };
}
