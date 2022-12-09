import { Star } from "phosphor-react";
import { useParams } from "react-router-dom";
import { HomeList } from "../components/HomeList";
import { Loading } from "../components/Loading";
import { useMovieCredits } from "../hooks/useMovieDetails";
import { useMovieKeywords } from "../hooks/useMovieKeywords";
import { useMovieOverview } from "../hooks/useMovieOverview";
import { API_BASEURL_IMAGE_1280 } from "../utils/constants";

export function MovieOverview() {
  let { movieId } = useParams();
  const { movieOverview } = useMovieOverview(movieId || "");
  const { movieCredits } = useMovieCredits(movieId || "");
  const { movieKeywords } = useMovieKeywords(movieId || "");

  return (
    <div className='w-full'>
      {!movieOverview ? (
        <Loading />
      ) : (
        <>
          <div className='w-full max-h-[80vh] flex items-center justify-center relative overflow-hidden'>
            <div className='max-w-[50vw] ml-16 rounded left-0 top-1/2 transform -translate-y-1/2 absolute z-50 overflow-hidden'>
              <h1
                aria-label={`nome do filme: ${movieOverview.title}`}
                title={`Filme: ${movieOverview.title}`}
                className='md:text-4xl font-bold text-2xl'
              >
                {movieOverview.title}
              </h1>

              <p
                aria-label={`Nome original do filme: ${movieOverview.title} é ${movieOverview.original_title}`}
                title={`Nome original: ${movieOverview.original_title}`}
                className='font-bold wrap-text text-md'
              >
                {movieOverview.original_title}
              </p>

              <div className='mt-3 flex row items-center justify-between'>
                <div className='flex row'>
                  <Star
                    className='mt-[2px]'
                    size={24}
                    color='#c00'
                    weight='fill'
                  />
                  <p className='text-lg ml-2 font-bold line-clamp-3'>
                    {movieOverview.vote_average.toFixed(1)}
                  </p>
                </div>
                <p className='text-lg ml-2 font-bold line-clamp-3'>
                  {movieOverview.runtime} min
                </p>
              </div>

              {movieOverview.genres && movieOverview.genres.length > 0 ? (
                <ul
                  aria-label={`Lista dos gêneros do filme:  ${movieOverview.title}`}
                  className='mt-3 md:flex flex-wrap gap-x-2 row hidden'
                >
                  {movieOverview.genres.slice(0, 5).map((genre, id: number) => (
                    <li
                      key={id}
                      title={genre.name}
                      aria-label={genre.name}
                      className='mb-1 flex bg-black/10 rounded-md border-2 border-customColors-red-500 cursor-default'
                    >
                      <p className='m-auto p-1'>{genre.name}</p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className='w-full h-12 bottom-0 bg-gradient-to-t from-customColors-background absolute z-50' />

            <img
              className='w-full h-auto flex-shrink-0 select-none bg-cover relative'
              src={API_BASEURL_IMAGE_1280 + movieOverview?.backdrop_path}
              alt={movieOverview?.title}
              title={movieOverview?.title}
            />
          </div>

          <div className='mt-2 mx-5'>
            <strong className='text-xl'>Sinopse</strong>
            <p
              aria-label={`Resumo do filme: ${movieOverview.title}: ${movieOverview.overview}`}
              title={movieOverview.overview}
              className='mt-2'
            >
              {movieOverview.overview}
            </p>
          </div>
          {movieKeywords && movieKeywords.keywords.length > 0 ? (
            <ul role='list' className='mt-2 mx-5 flex flex-row gap-2'>
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
          ) : null}

          {movieCredits && movieCredits.cast.length > 0 ? (
            <>
              <HomeList rowTitle='Elenco' data={movieCredits.cast} />
            </>
          ) : null}
        </>
      )}
    </div>
  );
}
