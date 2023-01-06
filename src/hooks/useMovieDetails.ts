import { useEffect, useState } from "react";
import { IMovieCredits } from "../interfaces/IMovieCredits";

import { service } from "../services/api";
import { MediaTypes } from '../types/sharedTypes/MediaTypes';

export function useMovieCredits(movieID: string) {
  const [movieCredits, setMovieCredits] = useState<IMovieCredits>();

  async function getMovieOverview(movieID: string, type: MediaTypes): Promise<IMovieCredits> {
    const movieCreditsData: IMovieCredits = await service
      .get<Promise<IMovieCredits>>(`/${type}/${movieID}/credits`)
      .then((response) => {
        return response.data;
      });

    return movieCreditsData;

  }


  useEffect(() => {
    fetchPopular(movieID);
  }, []);

  return {
    movieCredits,
  };
}
