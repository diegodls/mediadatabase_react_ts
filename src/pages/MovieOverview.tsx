import { useParams } from "react-router-dom";
import { FeaturedContent } from "../components/FeaturedContent";
import { HomeList } from "../components/HomeList";
import { Loading } from "../components/Loading";
import { MovieVideos } from "../components/MovieVideos";
import { Section } from "../components/Section";
import { SimilarMovies } from "../components/SimilarMovies";
import { useGenres } from "../hooks/useGenres";
import { useMovieCredits } from "../hooks/useMovieDetails";
import { useMovieImages } from "../hooks/useMovieImages";
import { useMovieKeywords } from "../hooks/useMovieKeywords";
import { useMovieOverview } from "../hooks/useMovieOverview";
import { useMovieVideos } from "../hooks/useMovieVideos";
import { useSimilarMovies } from "../hooks/useSimilarMovies";

export function MovieOverview() {
  let { movieId } = useParams();
  const { movieOverview } = useMovieOverview(movieId || "");
  const { movieCredits } = useMovieCredits(movieId || "");
  const { movieKeywords } = useMovieKeywords(movieId || "");
  const { movieVideos } = useMovieVideos(movieId || "");
  const { movieImages } = useMovieImages(movieId || "");
  const { similarMovies } = useSimilarMovies(movieId || "");

  const { movieGenresList } = useGenres();

  const genres_id: number[] | undefined = movieOverview?.genres.map((genre) => {
    return genre.id;
  });

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

          <Section title='Sinopse'>
            <p
              aria-label={`Resumo do filme: ${movieOverview.title}: ${movieOverview.overview}`}
              title={movieOverview.overview}
              className='mt-2'
            >
              {movieOverview.overview}
            </p>
          </Section>

          {movieKeywords && movieKeywords.keywords.length > 0 ? (
            <Section title='Tags'>
              <ul role='list' className='mt-4 flex flex-row gap-2 flex-wrap'>
                {movieKeywords.keywords.slice(0, 5).map((keyword) => (
                  <li
                    key={keyword.id}
                    title={keyword.name}
                    aria-label={keyword.name}
                    className='mb-1 p-1 px-3 flex bg-black/10 rounded-full border-2 border-customColors-red-500 cursor-pointer'
                  >
                    <p className='m-auto capitalize'>{keyword.name}</p>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {movieCredits && movieCredits.cast.length > 0 ? (
            <HomeList rowTitle='Elenco' data={movieCredits.cast} />
          ) : null}
        </div>
      )}

      <MovieVideos data={movieVideos} />

      {similarMovies && similarMovies.results.length > 0 ? (
        <SimilarMovies data={similarMovies.results} />
      ) : null}

      {movieImages && movieImages.backdrops.length > 0 ? (
        <h1>movieImages.backdrops.length: {movieImages.backdrops.length}</h1>
      ) : null}
    </div>
  );
}
