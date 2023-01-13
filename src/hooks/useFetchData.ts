import { useEffect, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";

import { service } from "../services/api";

export function useFetchData<T>(url: string) {
  const [data, setData] = useState<T>();
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [dataError, setDataError] = useState<IErrorFetchContent>();

  async function fetchData() {
    setLoadingData(true);
    setDataError(undefined);

    if (!url || url === undefined || url.length <= 0) {
      setDataError({
        status_message: "É necessário informar a URL do conteúdo!",
        success: false,
        status_code: 404,
      });
      return;
    }

    return await service
      .get<T>(`${url}`)
      .then((response) => {
        if (response.data) {
          setData(response.data);
        }
      })
      .catch((error: IErrorFetchContent) => {
        setDataError(error);
      })
      .finally(() => {
        setLoadingData(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loadingData,
    dataError,
    fetchData,
  };
}
