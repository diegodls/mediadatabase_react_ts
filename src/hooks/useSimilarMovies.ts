import { useEffect, useState } from "react";
import { ISimilarMovies } from "../interfaces/ISimilarMovies";

import { service } from "../services/api";

export function useSimilarMovies(movieID: string) {
  const [similarMovies, setSimilarMovies] = useState<ISimilarMovies>();

  async function getSimilarMovies(movieID: string): Promise<ISimilarMovies> {
    const similarMovieData: ISimilarMovies = await service
      .get<Promise<ISimilarMovies>>(`/movie/${movieID}/similar`)
      .then((response) => {
        return response.data;
      });

    return similarMovieData;
  }

  async function fetchSimilarMovies(movieID: string) {
    const similarMovies = await getSimilarMovies(movieID);

    if (similarMovies) {
      setSimilarMovies(similarMovies);
    }
  }
  useEffect(() => {
    fetchSimilarMovies(movieID);
  }, []);

  return {
    similarMovies,
  };
}
