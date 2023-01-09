import { useEffect, useState } from "react";
import {
  ISimilarMovies,
  ISimilarMoviesResult,
} from "../interfaces/ISimilarMovies";

import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { service } from "../services/api";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";

export function useSimilarContent(type: MediaTypes, contentID?: string) {
  const [similarContent, setSimilarContent] =
    useState<ISimilarMoviesResult[]>();
  const [loadingSimilarContent, setLoadingSimilarContent] =
    useState<boolean>(true);
  const [similarContentError, setSimilarContentError] =
    useState<IErrorFetchContent>();

  async function fetchSimilarContent() {
    console.log(`Buscando o item: ${contentID}`);

    setLoadingSimilarContent(true);
    setSimilarContentError(undefined);

    if (!contentID || contentID === undefined || contentID.length <= 0) {
      setSimilarContentError({
        status_message: "É necessário informar o ID do conteúdo!",
        success: false,
        status_code: 404,
      });
      console.log("Erro overview sem ID");

      return;
    }

    return await service
      .get<ISimilarMovies>(`/${type}/${contentID}/similar`)
      .then((response) => {
        if (response.data) {
          setSimilarContent(response.data.results);
        }
      })
      .catch((error: IErrorFetchContent) => {
        setSimilarContentError(error);
      })
      .finally(() => {
        setLoadingSimilarContent(false);
      });
  }

  useEffect(() => {
    fetchSimilarContent();
  }, []);

  return {
    similarContent,
    loadingSimilarContent,
    similarContentError,
    fetchSimilarContent,
  };
}
