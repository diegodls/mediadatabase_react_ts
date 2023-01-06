import { useEffect, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { IKeywords } from "../interfaces/IKeywords";
import { service } from "../services/api";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";

export function useKeywords(movieID: string, type: MediaTypes) {
  const [keywords, setKeywords] = useState<IKeywords>();
  const [loadingKeywords, setLoadingKeywords] = useState<boolean>(true);
  const [keywordsError, setKeywordsError] = useState<IErrorFetchContent>();

  async function getKeywords(movieID: string, type: MediaTypes) {
    setLoadingKeywords(true);
    return await service
      .get<IKeywords>(`/${type}/${movieID}/keywords`)
      .then((response) => {
        if (response.data) {
          setKeywords(response.data);
        }
      })
      .catch((error: IErrorFetchContent) => {
        setKeywordsError(error);
      })
      .finally(() => {
        setLoadingKeywords(false);
      });
  }

  useEffect(() => {
    getKeywords(movieID, type);
  }, []);

  return {
    keywords,
    loadingKeywords,
    keywordsError,
    getKeywords,
  };
}
