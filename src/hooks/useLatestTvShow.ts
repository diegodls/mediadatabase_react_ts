import { useEffect, useState } from "react";
import { ILatestTvShow } from "../interfaces/ILatestTvShow";

import { service } from "../services/api";

export function useLatestTvShow() {
  const [latestTvShow, setLatestTvShow] = useState<ILatestTvShow>();

  async function getLatestTvShow(): Promise<ILatestTvShow> {
    const latestTvShowData: ILatestTvShow = await service
      .get<Promise<ILatestTvShow>>(`/tv/latest`)
      .then((response) => {
        return response.data;
      });

    return latestTvShowData;
  }

  async function fetchPopular() {
    const latestTvShow = await getLatestTvShow();

    if (latestTvShow) {
      setLatestTvShow(latestTvShow);
    }
  }
  useEffect(() => {
    fetchPopular();
  }, []);

  return {
    latestTvShow,
  };
}
