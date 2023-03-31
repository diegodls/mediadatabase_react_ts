import { useEffect } from "react";
import { FeaturedContent } from "../components/FeaturedContent";
import { List } from "../components/List";
import { Loading } from "../components/Loading";
import { useFetchData } from "../hooks/useFetchData";
import { useGetRandomByDiscovery } from "../hooks/useGetRandomByDiscovery";
import { IDiscoveryTv, IDiscoveryTvResult } from "../interfaces/IDiscoveryTv";
import { IGenres } from "../interfaces/IGenres";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";

export function Tv() {
  const MEDIA_TYPE: MediaTypes = "tv";

  const URL_DISCOVERY_BY_GENRES = `discover/${MEDIA_TYPE}?sort_by=popularity.desc&include_adult=false&page=1&with_genres=`;

  const { data: tvGenresList } = useFetchData<IGenres>(
    `genre/${MEDIA_TYPE}/list`
  );

  const { randomContent, loadingRandomContent, randomContentError } =
    useGetRandomByDiscovery<IDiscoveryTvResult>("tv");

  const {
    data: actionTv,
    loadingData: loadingActionTv,
    dataError: errorActionTv,
  } = useFetchData<IDiscoveryTv>(`${URL_DISCOVERY_BY_GENRES}10759`);

  useEffect(() => {
    document.title = `MDB - Series`;
  }, []);

  const isFetchingData: boolean = loadingRandomContent || loadingActionTv;

  return isFetchingData ? (
    <Loading />
  ) : (
    <div className='w-full'>
      <FeaturedContent
        genresList={tvGenresList}
        contentGenresList={randomContent?.genre_ids}
        contentID={randomContent?.id}
        title={randomContent?.name}
        subTitle={randomContent?.original_name}
        release_date={randomContent?.first_air_date}
        backdrop_path={randomContent?.backdrop_path}
        overview={randomContent?.overview}
        vote_average={randomContent?.vote_average}
        type={MEDIA_TYPE}
        showReadMore={true}
      />

      <List<IDiscoveryTvResult>
        data={actionTv?.results}
        error={errorActionTv}
        title='Ação'
        type={MEDIA_TYPE}
      />
    </div>
  );
}
