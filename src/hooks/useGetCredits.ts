import { useEffect, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";

import { IMovieCredits } from "../interfaces/IMovieCredits";
import { service } from "../services/api";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";

export function useGetCredits(type: MediaTypes, contentID?: string) {
  const [credits, setCredits] = useState<IMovieCredits>();
  const [loadingCredits, setLoadingCredits] = useState<boolean>(true);
  const [creditsError, setCreditsError] = useState<IErrorFetchContent>();

  async function fetchCredits() {
    setLoadingCredits(true);
    setCreditsError(undefined);

    if (!contentID || contentID === undefined || contentID.length <= 0) {
      setCreditsError({
        status_message: "É necessário informar o ID do conteúdo!",
        success: false,
        status_code: 404,
      });
      return;
    }

    return await service
      .get<IMovieCredits>(`/${type}/${contentID}/credits`)
      .then((response) => {
        if (response.data) {
          setCredits(response.data);
        }
      })
      .catch((error: IErrorFetchContent) => {
        setCreditsError(error);
      })
      .finally(() => {
        setLoadingCredits(false);
      });
  }

  useEffect(() => {
    fetchCredits();
  }, []);

  return {
    credits,
    loadingCredits,
    creditsError,
    fetchCredits,
  };
}
