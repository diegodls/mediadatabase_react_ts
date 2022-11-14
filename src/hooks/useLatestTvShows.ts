import { useEffect, useState } from "react";
import { ILatestTvShows } from "../interfaces/ILatestTvShows";

import { service } from "../services/api";

export function useLatestTvShows() {
  const [latestTvShows, setLatestTvShows] = useState<ILatestTvShows>();

  async function getLatestTvShows(): Promise<ILatestTvShows> {
    const latestTvShowsData: ILatestTvShows = await service
      .get<Promise<ILatestTvShows>>(`/tv/latest`)
      .then((response) => {
        return response.data;
      });

    return latestTvShowsData;
  }

  async function fetchPopular() {
    const latestTvShows = await getLatestTvShows();

    if (latestTvShows) {
      setLatestTvShows(latestTvShows);
    }
  }
  useEffect(() => {
    fetchPopular();
  }, []);

  return {
    latestTvShows,
  };
}
