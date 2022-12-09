import { useEffect, useState } from "react";
import { IMovieKeywords } from "../interfaces/IMovieKeywords";

import { service } from "../services/api";

export function useMovieKeywords(movieID: string) {
  const [movieKeywords, setMovieKeywords] = useState<IMovieKeywords>();

  async function getMovieKeywords(movieID: string): Promise<IMovieKeywords> {
    const movieKeywordsData: IMovieKeywords = await service
      .get<Promise<IMovieKeywords>>(`/movie/${movieID}/keywords`)
      .then((response) => {
        return response.data;
      });

    return movieKeywordsData;
  }

  async function fetchKeywords(movieID: string) {
    const movieKeywords = await getMovieKeywords(movieID);

    if (movieKeywords) {
      setMovieKeywords(movieKeywords);
    }
  }
  useEffect(() => {
    fetchKeywords(movieID);
  }, []);

  return {
    movieKeywords,
  };
}
