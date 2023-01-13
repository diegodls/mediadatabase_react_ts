import { useEffect, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import {
  ITrendingMovies,
  ITrendingMoviesResult,
} from "../interfaces/ITrendingMovies";
import { service } from "../services/api";
import { MediaTimes } from "../types/sharedTypes/MediaTimes";
import { TrendingMediaTypes } from "../types/sharedTypes/MediaTypes";

export function useGetTrending(type: TrendingMediaTypes, time: MediaTimes) {
  const [trending, setTrending] = useState<ITrendingMoviesResult[]>();
  const [loadingTrending, setLoadingTrending] = useState<boolean>(true);
  const [trendingError, setTrendingError] = useState<IErrorFetchContent>();

  async function getTrending() {
    setLoadingTrending(true);
    setTrendingError(undefined);

    if (!type || type === undefined || !time || time === undefined) {
      setTrendingError({
        status_message: "É necessário informar o tipo e o tempo do conteúdo!",
        success: false,
        status_code: 404,
      });

      return;
    }

    return await service
      .get<ITrendingMovies>(`/trending/${type}/${time}`)
      .then((response) => {
        if (response.data) {
          setTrending(response.data.results);
        }
      })
      .catch((error: IErrorFetchContent) => {
        setTrendingError(error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoadingTrending(false);
        }, 500);
      });
  }

  useEffect(() => {
    getTrending();
  }, []);

  return {
    trending,
    loadingTrending,
    trendingError,
    getTrending,
  };
}
