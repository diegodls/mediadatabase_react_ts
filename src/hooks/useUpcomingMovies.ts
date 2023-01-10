import { useEffect, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import {
  IUpcomingMoviesApiReturn,
  IUpcomingMoviesResults,
} from "../interfaces/IUpcomingMovies";
import { service } from "../services/api";
import { MediaTypes } from "./../types/sharedTypes/MediaTypes";

export function useGetUpcoming(type: MediaTypes) {
  const [upcoming, setUpcoming] = useState<IUpcomingMoviesResults[]>();
  const [loadingUpcoming, setLoadingUpcoming] = useState<boolean>(true);
  const [upcomingError, setUpcomingError] = useState<IErrorFetchContent>();

  async function fetchUpcoming() {
    setLoadingUpcoming(true);
    setUpcomingError(undefined);

    return await service
      .get<IUpcomingMoviesApiReturn>(`/${type}/upcoming/`)
      .then((response) => {
        setUpcoming(response.data.results);
      })
      .catch((error) => {
        setUpcomingError(error);
      })
      .finally(() => {
        setLoadingUpcoming(false);
      });
  }

  useEffect(() => {
    fetchUpcoming();
  }, []);

  return {
    upcoming,
    loadingUpcoming,
    upcomingError,
    fetchUpcoming,
  };
}
