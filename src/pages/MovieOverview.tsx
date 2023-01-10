import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FeaturedContent } from "../components/FeaturedContent";
import { KeywordList } from "../components/KeywordsList";
import { Loading } from "../components/Loading";
import { Summary } from "../components/Summary";

import { List } from "../components/List";
import { MovieVideos } from "../components/MovieVideos";
import { SimilarMovies } from "../components/SimilarMovies";
import { useGenres } from "../hooks/useGenres";
import { useGetCredits } from "../hooks/useGetCredits";
import { useGetKeywords } from "../hooks/useGetKeywords";
import { useGetOverview } from "../hooks/useGetOverview";
import { useSimilarContent } from "../hooks/useGetSimilarContent";
import { useGetVideos } from "../hooks/useGetVideos";
import { IKeywords } from "../interfaces/IKeywords";

export function MovieOverview() {
  let { movieId } = useParams();
  const { overview, loadingOverview, overviewError, fetchOverview } =
    useGetOverview("movie", movieId);
  const { keywords, keywordsError, fetchKeywords } = useGetKeywords<IKeywords>(
    "movie",
    movieId
  );
  const { credits, creditsError, fetchCredits } = useGetCredits(
    "movie",
    movieId
  );
  const { videos, videosError, fetchVideos } = useGetVideos("movie", movieId);

  const { similarContent, similarContentError, fetchSimilarContent } =
    useSimilarContent("movie", movieId);

  const { movieGenresList } = useGenres();

  function refetchData(contentID: string | undefined = undefined) {
    if (!contentID) return;
    fetchOverview();
    fetchKeywords();
    fetchCredits();
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

          <SimilarMovies data={similarContent} error={similarContentError} />
        </div>
      )}
    </div>
  );
}
