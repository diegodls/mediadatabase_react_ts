import { useEffect, useState } from "react";
import { IMovieVideos } from "../interfaces/IMovieVideos";

import { AxiosRequestConfig } from "axios";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { service } from "../services/api";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";

export function useGetVideos(type: MediaTypes, contentID?: string) {
  const [videos, setVideos] = useState<IMovieVideos>();
  const [loadingVideos, setLoadingVideos] = useState<boolean>(true);
  const [videosError, setVideosError] = useState<IErrorFetchContent>();

  async function returnVideos(options?: AxiosRequestConfig) {
    setLoadingVideos(true);
    setVideosError(undefined);

    if (!contentID || contentID === undefined || contentID.length <= 0) {
      setVideosError({
        status_message: "É necessário informar o ID do conteúdo!",
        success: false,
        status_code: 404,
      });

      return;
    }

    return await service
      .get<IMovieVideos>(`/${type}/${contentID}/videos`, { ...options })
      .then((response) => {
        if (response.data) {
          return response.data;
        }
      })
      .catch((error: IErrorFetchContent) => {
        setVideosError(error);
      })
      .finally(() => {
        setLoadingVideos(false);
      });
  }

  async function fetchVideos() {
    const movieVideosWithParamsLanguage = await returnVideos();

    if (movieVideosWithParamsLanguage) {
      setVideos(movieVideosWithParamsLanguage);
    }

    if (!movieVideosWithParamsLanguage) {
      const movieVideosWithoutParamsLanguage = await returnVideos({
        params: { language: undefined },
      });

      if (movieVideosWithoutParamsLanguage) {
        setVideos(movieVideosWithoutParamsLanguage);
      }
    }
  }
  useEffect(() => {
    fetchVideos();
  }, []);

  return {
    videos,
    loadingVideos,
    videosError,
    fetchVideos,
  };
}
