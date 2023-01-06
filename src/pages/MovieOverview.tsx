import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FeaturedContent } from "../components/FeaturedContent";
import { KeywordList } from "../components/KeywordsList";
import { Loading } from "../components/Loading";
import { Summary } from "../components/Summary";
import { useGenres } from "../hooks/useGenres";
import { useMovieOverview } from "../hooks/useGetOverview";
import { useKeywords } from "../hooks/useKeywords";
import { useMovieCredits } from "../hooks/useMovieDetails";
import { useMovieImages } from "../hooks/useMovieImages";
import { useMovieVideos } from "../hooks/useMovieVideos";
import { useSimilarMovies } from "../hooks/useSimilarMovies";

export function MovieOverview() {
  let { movieId } = useParams();
  const { movieOverview, movieOverviewError, fetchOverview } = useMovieOverview(
    movieId || ""
  );
  const { keywords, keywordsError } = useKeywords(movieId || "", "movie");
  const { movieCredits } = useMovieCredits(movieId || "");
  const { movieVideos } = useMovieVideos(movieId || "");
  const { movieImages } = useMovieImages(movieId || "");
  const { similarMovies } = useSimilarMovies(movieId || "");
  const { movieGenresList } = useGenres();

  function refetchData(contentID: string | undefined = undefined) {
    if (!contentID) return;
    fetchOverview();
  }

  const genres_id: number[] | undefined = movieOverview?.genres.map((genre) => {
    return genre.id;
  });

  useEffect(() => {
    refetchData(movieId);
  }, [movieId]);

  return (
    <div className='w-full'>
      {!movieOverview ? (
        <Loading />
      ) : (
        <div className='w-full h-full flex flex-col gap-4'>
          <FeaturedContent
            genresList={movieGenresList}
            contentGenresList={genres_id}
            title={movieOverview?.title}
            subTitle={movieOverview?.original_title}
            backdrop_path={movieOverview?.backdrop_path}
            overview={movieOverview?.overview}
            vote_average={movieOverview?.vote_average}
            type={"movie"}
            showReadMore={false}
          />

          <Summary
            title={movieOverview?.title}
            overview={movieOverview?.overview}
          />

          <KeywordList title={"TAGS"} data={keywords} error={keywordsError} />

          <List title='Elenco' data={movieCredits.cast} error={} />
        </div>
      )}
      {/* 
      <MovieVideos data={movieVideos} />

      <SimilarMovies similarMovies={similarMovies} /> */}
    </div>
  );
}
