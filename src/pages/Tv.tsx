import { useEffect } from "react";
import { Loading } from "../components/Loading";
import { useGetRandomByDiscovery } from "../hooks/useGetRandomMovie";
import { IDiscoveryTvResult } from "../interfaces/IDiscoveryTv";

export function Tv() {
  const { randomContent, loadingRandomContent, randomContentError } =
    useGetRandomByDiscovery<IDiscoveryTvResult>("tv");

  useEffect(() => {
    document.title = `MDB - Series`;
  }, []);

  return !loadingRandomContent ? (
    <div className='w-full mt-headerHeight'>
      <p>{randomContent?.genre_ids}</p>
      <p>{randomContent?.original_name || randomContent?.name}</p>
    </div>
  ) : (
    <Loading />
  );
}
