import { useEffect, useState } from "react";
import { IMovieOverview } from "../interfaces/IMovieOverview";
import { MediaTypes } from "./../types/sharedTypes/MediaTypes";

import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { service } from "../services/api";

export function useGetOverview(ContentID: string, type: MediaTypes) {
  const [overview, setOverview] = useState<IMovieOverview>();
  const [loadingOverview, setLoadingOverview] = useState<boolean>(true);
  const [overviewError, setOverviewError] = useState<IErrorFetchContent>();

  async function getMovieOverview(ContentID: string, type: MediaTypes) {

    Colocar uma condição onde não tiver o id, setar um erro de ID invalido e popular o overviewError

    setLoadingOverview(true);
    return await service
      .get<IMovieOverview>(`/${type}/${ContentID}`)
      .then((response) => {
        if (response.data) {
          setOverview(response.data);
        }
      })
      .catch((error: IErrorFetchContent) => {
        setOverviewError(error);
      })
      .finally(() => {
        setLoadingOverview(false);
      });
  }

  useEffect(() => {
    getMovieOverview(ContentID, type);
  }, []);

  return {
    overview,
    loadingOverview,
    overviewError,
    getMovieOverview,
  };
}
