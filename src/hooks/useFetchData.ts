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

    let isCurrentUrl: boolean = true;

    if (!url || url === undefined || url.length <= 0) {
      setDataError({
        status_message: "É necessário informar a URL do conteúdo!",
        success: false,
        status_code: 400,
      });
      return;
    }

    console.log(`${"#".repeat(50)}Buscando: ${url}`);

    await service
      .get<T>(`${url}`)
      .then((response) => {
        if (response.data && isCurrentUrl) {
          console.log(`${"#".repeat(25)}Retorno de: ${url}`);
          console.log(response.data);
          setData(response.data);
        }
      })
      .catch((error: IErrorFetchContent) => {
        setDataError(error);
      })
      .finally(() => {
        setLoadingData(false);
      });

    return () => {
      isCurrentUrl = false;
    };
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
