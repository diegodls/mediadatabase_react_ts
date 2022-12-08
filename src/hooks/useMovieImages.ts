import axios from "axios";
import { useEffect, useState } from "react";
import { IMovieImages } from "../interfaces/IMovieImages";

import { service } from "../services/api";

export function useMovieImages(movieID: string) {
  const [movieImages, setMovieImages] = useState<IMovieImages>();

  async function getMovieImages(movieID: string): Promise<IMovieImages> {
    axios.defaults.params = {};
    const movieImagesData: IMovieImages = await service
      .get<Promise<IMovieImages>>(`/movie/${movieID}/images`)
      .then((response) => {
        return response.data;
      });

    console.log("getMovieImages");
    console.log(movieImagesData);

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
