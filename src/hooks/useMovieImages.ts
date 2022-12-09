import { useEffect, useState } from "react";
import { IMovieImages } from "../interfaces/IMovieImages";

import { service } from "../services/api";

export function useMovieImages(movieID: string) {
  const [movieImages, setMovieImages] = useState<IMovieImages>();

  async function getMovieImages(movieID: string): Promise<IMovieImages> {
    /*
    //interceptors affect all request, not only this one
    service.interceptors.request.use((config) => {
      config.params = {};
      return config;
    });
    */

    const movieImagesData: IMovieImages = await service
      .get<Promise<IMovieImages>>(`/movie/${movieID}/images`)
      .then((response) => {
        return response.data;
      });

    return movieImagesData;
  }

  async function fetchPopular(movieID: string) {
    const movieImages = await getMovieImages(movieID);

    if (movieImages) {
      setMovieImages(movieImages);
    }
  }
  useEffect(() => {
    fetchPopular(movieID);
  }, []);

  return {
    movieImages,
  };
}
