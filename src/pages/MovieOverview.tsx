import { Star } from "phosphor-react";
import { useParams } from "react-router-dom";
import { Loading } from "../components/Loading";
import { useGenres } from "../hooks/useGenres";
import { useMovieOverview } from "../hooks/useMovieOverview";
import { API_BASEURL_IMAGE_1280 } from "../utils/constants";

export function MovieOverview() {
  let { movieId } = useParams();
  const { movieOverview } = useMovieOverview(movieId || "");
  const { movieGenresList } = useGenres();

  return (
    <div className='w-screen h-screen'>
      {!movieOverview ? (
        <Loading />
      ) : (
        <>
          <div className='w-full max-h-[80vh] flex items-center justify-center relative overflow-hidden'>
            <div className='md:w-80 w-60 ml-16 rounded left-0 top-1/2 transform -translate-y-1/2 absolute z-50 overflow-hidden'>
              <h1
                aria-label={`Seriado: ${movieOverview.title}`}
                title={`Seriado: ${movieOverview.title}`}
                className='md:text-4xl font-bold wrap-text text-2xl'
              >
                {movieOverview.title}
              </h1>

              <div className='mt-3 flex row items-center justify-between'>
                <span className='flex row'>
                  <Star
                    className='mt-[2px]'
                    size={24}
                    color='#c00'
                    weight='fill'
                  />
                  <span className='text-lg ml-2 font-bold line-clamp-3'>
                    {movieOverview.vote_average.toFixed(1)}
                  </span>
                </span>
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

            <img
              className='w-full h-auto flex-shrink-0 select-none bg-cover'
              src={API_BASEURL_IMAGE_1280 + movieOverview?.backdrop_path}
              alt={movieOverview?.title}
              title={movieOverview?.title}
            />
          </div>
          <span
            aria-label={`Resumo do filme: ${movieOverview.title}: ${movieOverview.overview}`}
            title={movieOverview.overview}
            className='mt-2 md:line-clamp-3 line-clamp-2'
          >
            {movieOverview.overview}
          </span>
          {movieOverview.genres[0].name}
        </>
      )}
    </div>
  );
}
