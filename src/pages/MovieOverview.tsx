import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FeaturedContent } from "../components/FeaturedContent";
import { KeywordList } from "../components/KeywordsList";
import { Loading } from "../components/Loading";
import { Summary } from "../components/Summary";

import { List } from "../components/List";
import { MovieVideos } from "../components/MovieVideos";
import { SimilarMovies } from "../components/SimilarMovies";
import { useFetchData } from "../hooks/useFetchData";
import { IGenres } from "../interfaces/IGenres";
import { IKeywords } from "../interfaces/IKeywords";
import { IMovieCredits } from "../interfaces/IMovieCredits";
import { IMovieOverview } from "../interfaces/IMovieOverview";
import { IMovieVideos } from "../interfaces/IMovieVideos";
import { ISimilarMovies } from "../interfaces/ISimilarMovies";

export function MovieOverview() {
  let { movieId } = useParams();

  const {
    data: overview,
    loadingData: loadingOverview,
    fetchData: fetchOverview,
  } = useFetchData<IMovieOverview>(`movie/${movieId}`);

  const {
    data: keywords,
    dataError: keywordsError,
    fetchData: fetchKeywords,
  } = useFetchData<IKeywords>(`movie/${movieId}/keywords`);

  const {
    data: credits,
    dataError: creditsError,
    fetchData: getCredits,
  } = useFetchData<IMovieCredits>(`movie/${movieId}/credits`);

  const {
    data: videos,
    dataError: videosError,
    fetchData: fetchVideos,
  } = useFetchData<IMovieVideos>(`movie/${movieId}/videos`);

  const {
    data: similarContent,
    dataError: similarContentError,
    fetchData: fetchSimilarContent,
  } = useFetchData<ISimilarMovies>(`movie/${movieId}/similar`);

  const { data: movieGenresList } = useFetchData<IGenres>(`genre/movie/list`);

  function refetchData(contentID: string | undefined = undefined) {
    if (!contentID) return;
    fetchOverview();
    fetchKeywords();
    getCredits();
    fetchVideos();
    fetchSimilarContent();
  }

  const genres_id: number[] | undefined = overview?.genres.map((genre) => {
    return genre.id;
  });

  useEffect(() => {
    refetchData(movieId);
    window.scrollTo(0, 0);
  }, [movieId]);

  return (
    <div className='w-full'>
      {!overview || loadingOverview ? (
        <Loading />
      ) : (
        <div className='w-full flex flex-col gap-4'>
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
            type={"movie"}
            showReadMore={false}
          />

          <Summary title={overview?.title} overview={overview?.overview} />

          <KeywordList data={keywords} error={keywordsError} />

          <List title='Elenco' data={credits?.cast} error={creditsError} />

          <MovieVideos data={videos} error={videosError} />

          <SimilarMovies
            data={similarContent?.results}
            error={similarContentError}
          />
        </div>
      )}
    </div>
  );
}
