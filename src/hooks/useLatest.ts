import { useEffect, useState } from "react";
import { ILatestTvShow } from "../interfaces/ILatestTvShow";

import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { service } from "../services/api";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";

export function useLatestTvShow(type: MediaTypes) {
  const [latest, setLatest] = useState<ILatestTvShow>();
  const [loadingLatest, setLoadingLatest] = useState<boolean>(true);
  const [latestError, setLatestError] = useState<IErrorFetchContent>();

  async function getLatest() {
    setLoadingLatest(true);
    setLatestError(undefined);

    if (!type || type === undefined || type.length <= 0) {
      setLatestError({
        status_message: "É necessário informar o ID do conteúdo!",
        success: false,
        status_code: 404,
      });

      return;
    }

    return await service
      .get<ILatestTvShow>(`/${type}/latest`)
      .then((response) => {
        if (response.data) {
          setLatest(response.data);
        }
      })
      .catch((error: IErrorFetchContent) => {
        setLatestError(error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoadingLatest(false);
        }, 500);
      });
  }

  useEffect(() => {
    getLatest();
  }, []);

  return {
    latest,
    loadingLatest,
    latestError,
    getLatest,
  };
}
