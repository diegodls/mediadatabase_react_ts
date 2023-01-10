import { useEffect, useState } from "react";
import { IMovieOverview } from "../interfaces/IMovieOverview";
import { MediaTypes } from "./../types/sharedTypes/MediaTypes";

import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { service } from "../services/api";

export function useGetOverview(type: MediaTypes, contentID?: string) {
  const [overview, setOverview] = useState<IMovieOverview>();
  const [loadingOverview, setLoadingOverview] = useState<boolean>(true);
  const [overviewError, setOverviewError] = useState<IErrorFetchContent>();

  async function fetchOverview() {
    setLoadingOverview(true);
    setOverviewError(undefined);

    if (!contentID || contentID === undefined || contentID.length <= 0) {
      setOverviewError({
        status_message: "É necessário informar o ID do conteúdo!",
        success: false,
        status_code: 404,
      });

      return;
    }

    return await service
      .get<IMovieOverview>(`/${type}/${contentID}`)
      .then((response) => {
        if (response.data) {
          setOverview(response.data);
        }
      })
      .catch((error: IErrorFetchContent) => {
        setOverviewError(error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoadingOverview(false);
        }, 500);
      });
  }

  useEffect(() => {
    fetchOverview();
  }, []);

  return {
    overview,
    loadingOverview,
    overviewError,
    fetchOverview,
  };
}
