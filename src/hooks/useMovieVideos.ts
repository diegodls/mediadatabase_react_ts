import { useEffect, useState } from "react";
import { IMovieVideos } from "../interfaces/IMovieVideos";

import { service, serviceWithoutParams } from "../services/api";

export function useMovieVideos(movieID: string) {
  const [movieVideos, setMovieVideos] = useState<IMovieVideos>();

  async function getMovieVideosWithParamsLanguage(
    movieID: string
  ): Promise<IMovieVideos> {
    const movieVideosData: IMovieVideos = await service
      .get<Promise<IMovieVideos>>(`/movie/${movieID}/videos`)
      .then((response) => {
        return response.data;
      });

    return movieVideosData;
  }

  async function getMovieVideosWithoutParamsLanguage(
    movieID: string
  ): Promise<IMovieVideos> {
    const movieVideosData: IMovieVideos = await serviceWithoutParams
      .get<Promise<IMovieVideos>>(`/movie/${movieID}/images`)
      .then((response) => {
        return response.data;
      });

    return movieVideosData;
  }

  async function fetchMovieVideos(movieID: string) {
    const movieVideosWithParamsLanguage =
      await getMovieVideosWithParamsLanguage(movieID);

    if (movieVideosWithParamsLanguage) {
      setMovieVideos(movieVideosWithParamsLanguage);
    }

    if (!movieVideosWithParamsLanguage) {
      const movieVideosWithoutParamsLanguage =
        await getMovieVideosWithoutParamsLanguage(movieID);

      if (movieVideosWithoutParamsLanguage) {
        setMovieVideos(movieVideosWithoutParamsLanguage);
      }
    }
  }
  useEffect(() => {
    fetchMovieVideos(movieID);
  }, []);

  return {
    movieVideos,
  };
}
