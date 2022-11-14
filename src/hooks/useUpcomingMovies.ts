import { useEffect, useState } from "react";
import {
  IUpcomingMovies,
  IUpcomingMoviesResults,
} from "../interfaces/IUpcomingMovies";
import { service } from "../services/api";

export function useUpcomingMovies() {
  const [upcomingMovies, setUpcoming] = useState<IUpcomingMoviesResults[]>();

  async function getTrending(): Promise<IUpcomingMoviesResults[]> {
    const upcomingData: IUpcomingMovies = await service
      .get<Promise<IUpcomingMovies>>(`/movie/upcoming/`)
      .then((response) => {
        return response.data;
      });

    console.log("upcomingData.results");
    console.log(upcomingData.results.length);

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

  console.log("useUpcoming");

  return {
    upcomingMovies,
  };
}
