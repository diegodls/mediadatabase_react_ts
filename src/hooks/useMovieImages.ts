import { useEffect, useState } from "react";
import { IMovieImages } from "../interfaces/IMovieImages";

import { service } from "../services/api";

export function useMovieImages(movieID: string) {
  const [movieImages, setMovieImages] = useState<IMovieImages>();

  async function getMovieImages(movieID: string): Promise<IMovieImages> {
    const movieImagesData: IMovieImages = await service
      .get<Promise<IMovieImages>>(`/movie/${movieID}/images`, {
        params: { language: undefined },
      })
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
