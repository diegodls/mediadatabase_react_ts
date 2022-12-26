import { useParams } from "react-router-dom";
import { HomeList } from "../components/HomeList";
import { Section } from "../components/IUSharedComponents/Section";
import { Loading } from "../components/Loading";
import { MovieOverviewBannerDescription } from "../components/MovieOverviewBannerDescription";
import { MovieVideos } from "../components/MovieVideos";
import { SimilarMovies } from "../components/SimilarMovies";
import { useMovieCredits } from "../hooks/useMovieDetails";
import { useMovieKeywords } from "../hooks/useMovieKeywords";
import { useMovieOverview } from "../hooks/useMovieOverview";
import { useMovieVideos } from "../hooks/useMovieVideos";
import { useSimilarMovies } from "../hooks/useSimilarMovies";
import { API_BASEURL_IMAGE_1280 } from "../utils/constants";

export function MovieOverview() {
  let { movieId } = useParams();
  const { movieOverview } = useMovieOverview(movieId || "");
  const { movieCredits } = useMovieCredits(movieId || "");
  const { movieKeywords } = useMovieKeywords(movieId || "");
  const { movieVideos } = useMovieVideos(movieId || "");
  const { similarMovies } = useSimilarMovies(movieId || "");

  return (
    <div className='w-full'>
      {!movieOverview ? (
        <Loading />
      ) : (
        <div className='w-full h-full flex flex-col gap-4'>
          <div className='relative'>
            <div className='w-full max-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden'>
              <div className='w-full h-12 bottom-0 bg-gradient-to-t from-customColors-background absolute z-50' />

              <img
                className='w-full h-auto flex-shrink-0 select-none bg-cover relative'
                src={API_BASEURL_IMAGE_1280 + movieOverview?.backdrop_path}
                alt={movieOverview?.title}
                title={movieOverview?.title}
              />
            </div>
            <div className='w-full h-full top-0 bg-gradient-to-r from-customColors-background via-transparent absolute z-40 hidden md:block' />

            <MovieOverviewBannerDescription movieOverview={movieOverview} />
          </div>

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
    </div>
  );
}
