import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FeaturedContent } from "../components/FeaturedContent";
import { KeywordList } from "../components/KeywordsList";
import { List } from "../components/List";
import { Loading } from "../components/Loading";
import { MovieVideos } from "../components/MovieVideos";
import { Summary } from "../components/Summary";
import { useFetchData } from "../hooks/useFetchData";

import { Seasons } from "../components/Seasons";
import { IGenres } from "../interfaces/IGenres";
import { ITVKeywords } from "../interfaces/IKeywords";
import { IMovieCredits } from "../interfaces/IMovieCredits";
import { IMovieVideos } from "../interfaces/IMovieVideos";
import { IRecommendedApiReturn } from "../interfaces/IRecommended";
import { ITvOverview } from "../interfaces/ITvOverview";
import { ITvSeasonDetailed } from "../interfaces/ITvSeasonDetailed";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";

export function TvOverview() {
  let { tvID } = useParams();

  const type: MediaTypes = "tv";

  const [currentSeasonNumber, setCurrentSeasonNumber] = useState(1);

  const {
    data: overview,
    loadingData: loadingOverview,
    fetchData: fetchOverview,
  } = useFetchData<ITvOverview>(`${type}/${tvID}`);

  const {
    data: keywords,
    dataError: keywordsError,
    fetchData: fetchKeywords,
  } = useFetchData<ITVKeywords>(`${type}/${tvID}/keywords`);

  const {
    data: credits,
    dataError: creditsError,
    fetchData: getCredits,
  } = useFetchData<IMovieCredits>(`${type}/${tvID}/credits`);

  const {
    data: videos,
    dataError: videosError,
    fetchData: fetchVideos,
  } = useFetchData<IMovieVideos>(`${type}/${tvID}/videos`);

  const {
    data: recommendedContent,
    dataError: recommendedContentError,
    fetchData: fetchRecommendedContent,
  } = useFetchData<IRecommendedApiReturn>(`${type}/${tvID}/recommendations`);

  const { data: genreList } = useFetchData<IGenres>(`genre/${type}/list`);

  function refetchData(contentID: string | undefined = undefined) {
    if (!contentID) return;
    fetchOverview();
    fetchKeywords();
    getCredits();
    fetchVideos();
    fetchRecommendedContent();
  }

  const genres_id: number[] | undefined = overview?.genres.map((genre) => {
    return genre.id;
  });

  const {
    data: currentSeason,
    loadingData: loadingCurrentSeason,
    dataError: errorCurrentSeason,
    fetchData: fetchCurrentSeason,
  } = useFetchData<ITvSeasonDetailed>(
    `/tv/${tvID}/season/${currentSeasonNumber}`
  );

  function refetchCurrentSeason(
    season_number: ITvSeasonDetailed["season_number"]
  ) {
    if (season_number > 0 && season_number !== currentSeasonNumber) {
      setCurrentSeasonNumber(season_number);
    }
  }

  useEffect(() => {
    refetchData(tvID);
    window.scrollTo(0, 0);
  }, [tvID]);

  useEffect(() => {
    if (!overview) return;
    document.title = `MDB - ${overview.name || overview.original_name}`;
  }, [overview]);

  useEffect(() => {
    fetchCurrentSeason();
  }, [currentSeasonNumber]);

  return (
    <div className='w-full'>
      {!overview || loadingOverview ? (
        <Loading />
      ) : (
        <div className='flex w-full flex-col gap-4 overflow-x-hidden'>
          <FeaturedContent
            genresList={genreList}
            contentGenresList={genres_id}
            title={overview?.name}
            subTitle={overview?.original_name}
            number_of_episodes={overview?.number_of_episodes}
            number_of_seasons={overview?.number_of_seasons}
            release_date={overview?.first_air_date}
            last_on_air={overview?.last_air_date}
            backdrop_path={overview?.backdrop_path}
            overview={overview?.overview}
            vote_average={overview?.vote_average}
            type={type}
            showInfo={false}
            showReadMore={false}
          />

          <Summary title={overview?.name} overview={overview?.overview} />

          <KeywordList data={keywords?.results} error={keywordsError} />

          <List
            title='Elenco'
            type='person'
            data={credits?.cast}
            error={creditsError}
          />

          <MovieVideos
            data={videos}
            error={videosError}
            mediaName={overview.name || overview.original_name}
          />

          <Seasons
            seasons={overview.seasons}
            currentSeason={currentSeason}
            refetchCurrentSeason={refetchCurrentSeason}
            loadingCurrentSeason={loadingCurrentSeason}
          />

          <List
            title='Você também pode gostar'
            type={type}
            data={recommendedContent?.results}
            error={recommendedContentError}
          />
        </div>
      )}
    </div>
  );
}
