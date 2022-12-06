import { useEffect, useState } from "react";
import { IMovieOverview } from "../interfaces/IMovieOverview";

import { service } from "../services/api";

export function useMovieOverview(movieID: string) {
  const [movieOverview, setMovieOverview] = useState<IMovieOverview>();

  async function getMovieOverview(movieID: string): Promise<IMovieOverview> {
    const movieDetailsData: IMovieOverview = await service
      .get<Promise<IMovieOverview>>(`/movie/${movieID}`)
      .then((response) => {
        return response.data;
      });

    return movieDetailsData;
  }

  async function fetchPopular(movieID: string) {
    const movieDetails = await getMovieOverview(movieID);

    if (movieDetails) {
      setMovieOverview(movieDetails);
      return movieDetails;
    }
  }
  useEffect(() => {
    fetchPopular(movieID);
  }, []);

  return {
    movieOverview,
  };
}
