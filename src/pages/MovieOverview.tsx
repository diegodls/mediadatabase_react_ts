import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FeaturedContent } from "../components/FeaturedContent";
import { KeywordList } from "../components/KeywordsList";
import { List } from "../components/List";
import { Loading } from "../components/Loading";
import { MovieVideos } from "../components/MovieVideos";
import { Summary } from "../components/Summary";
import { useFetchData } from "../hooks/useFetchData";

import { IGenres } from "../interfaces/IGenres";
import { IKeywords } from "../interfaces/IKeywords";
import { IMovieCredits } from "../interfaces/IMovieCredits";
import { IMovieOverview } from "../interfaces/IMovieOverview";
import { IMovieVideos } from "../interfaces/IMovieVideos";
import { IRecommendedApiReturn } from "../interfaces/IRecommended";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";

export function MovieOverview() {
  let { movieId } = useParams();

  const type: MediaTypes = "movie";

  const {
    data: overview,
    loadingData: loadingOverview,
    fetchData: fetchOverview,
  } = useFetchData<IMovieOverview>(`${type}/${movieId}`);

  const {
    data: keywords,
    dataError: keywordsError,
    fetchData: fetchKeywords,
  } = useFetchData<IKeywords>(`${type}/${movieId}/keywords`);

  const {
    data: credits,
    dataError: creditsError,
    fetchData: getCredits,
  } = useFetchData<IMovieCredits>(`${type}/${movieId}/credits`);

  const {
    data: videos,
    dataError: videosError,
    fetchData: fetchVideos,
  } = useFetchData<IMovieVideos>(`${type}/${movieId}/videos`);

  const {
    data: recommendedContent,
    dataError: recommendedContentError,
    fetchData: fetchRecommendedContent,
  } = useFetchData<IRecommendedApiReturn>(`${type}/${movieId}/recommendations`);

  const { data: movieGenresList } = useFetchData<IGenres>(`genre/${type}/list`);

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

  useEffect(() => {
    refetchData(movieId);
    window.scrollTo(0, 0);
  }, [movieId]);

  useEffect(() => {
    if (!overview) return;

    document.title = `MDB - ${overview.title || overview.original_title}`;
  }, [overview]);

  return (
    <div className='w-full'>
      {!overview || loadingOverview ? (
        <Loading />
      ) : (
        <div className='w-full flex flex-col gap-4 overflow-x-hidden'>
          <FeaturedContent
            genresList={movieGenresList}
            contentGenresList={genres_id}
            title={overview?.title}
            subTitle={overview?.original_title}
            release_date={overview?.release_date}
            runtime={overview?.runtime}
            backdrop_path={overview?.backdrop_path}
            overview={overview?.overview}
            vote_average={overview?.vote_average}
            type={type}
            showInfo={false}
            showReadMore={false}
          />

          <Summary title={overview?.title} overview={overview?.overview} />

          <KeywordList data={keywords?.keywords} error={keywordsError} />

          <List
            title='Elenco'
            type='person'
            data={credits?.cast}
            error={creditsError}
          />

          <MovieVideos
            data={videos}
            error={videosError}
            mediaName={overview.title || overview.original_title}
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
