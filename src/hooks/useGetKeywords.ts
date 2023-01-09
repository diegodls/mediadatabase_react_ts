import { useEffect, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { service } from "../services/api";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";

export function useGetKeywords<T>(type: MediaTypes, contentID?: string) {
  const [keywords, setKeywords] = useState<T>();
  const [loadingKeywords, setLoadingKeywords] = useState<boolean>(true);
  const [keywordsError, setKeywordsError] = useState<IErrorFetchContent>();

  async function fetchKeywords() {
    setLoadingKeywords(true);
    return await service
      .get<T>(`/${type}/${contentID}/keywords`)
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
    fetchKeywords();
  }, []);

  return {
    keywords,
    loadingKeywords,
    keywordsError,
    fetchKeywords,
  };
}
