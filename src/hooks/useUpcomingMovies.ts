import { useEffect, useState } from "react";
import {
  IUpcomingMoviesApiReturn,
  IUpcomingMoviesResults,
} from "../interfaces/IUpcomingMovies";
import { service } from "../services/api";

export function useUpcomingMovies() {
  const [upcomingMovies, setUpcoming] = useState<IUpcomingMoviesResults[]>();

  async function getTrending(): Promise<IUpcomingMoviesResults[]> {
    const upcomingData: IUpcomingMoviesApiReturn = await service
      .get<Promise<IUpcomingMoviesApiReturn>>(`/movie/upcoming/`)
      .then((response) => {
        return response.data;
      });

    return upcomingData.results;
  }

  async function fetchOverview() {
    const upcoming = await getTrending();

    if (upcoming) {
      setUpcoming(upcoming);
    }
  }
  useEffect(() => {
    fetchOverview();
  }, []);

  return {
    upcomingMovies,
  };
}
