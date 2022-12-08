import { useEffect, useState } from "react";
import { IMovieCredits } from "../interfaces/IMovieCredits";

import { service } from "../services/api";

export function useMovieCredits(movieID: string) {
  const [movieCredits, setMovieCredits] = useState<IMovieCredits>();

  async function getMovieOverview(movieID: string): Promise<IMovieCredits> {
    const movieCreditsData: IMovieCredits = await service
      .get<Promise<IMovieCredits>>(`/movie/${movieID}/credits`)
      .then((response) => {
        return response.data;
      });

    return movieCreditsData;
  }

  async function fetchPopular(movieID: string) {
    const movieDetails = await getMovieOverview(movieID);

    if (movieDetails) {
      setMovieCredits(movieDetails);
    }
  }
  useEffect(() => {
    fetchPopular(movieID);
  }, []);

  return {
    movieCredits,
  };
}
