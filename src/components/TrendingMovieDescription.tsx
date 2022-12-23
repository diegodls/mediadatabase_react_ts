import { Star } from "phosphor-react";
import { NavLink } from "react-router-dom";
import { IGenres } from "../interfaces/IGenres";
import { ITrendingMoviesResult } from "../interfaces/ITrendingMovies";

interface TrendingMovieDescriptionProps {
  slideArray: ITrendingMoviesResult[];
  movieGenresList: IGenres | undefined;
  currentIndex: number;
}

export function TrendingMovieDescription({
  slideArray,
  movieGenresList,
  currentIndex,
}: TrendingMovieDescriptionProps) {
  return (
    <>
      <div className='md:w-80 w-60 ml-16 rounded top-1/2 transform -translate-y-1/2 absolute z-50 overflow-hidden'>
        <h1
          aria-label={`Filme: ${slideArray[currentIndex].title}`}
          title={`Filme: ${slideArray[currentIndex].title}`}
          className='md:text-4xl font-bold wrap-text line-clamp-1 text-2xl md:w-80 md:line-clamp-1'
        >
          {slideArray[currentIndex].title}
        </h1>
        <span
          aria-label={`Resumo do filme: ${slideArray[currentIndex].title}: ${slideArray[currentIndex].overview}`}
          title={slideArray[currentIndex].overview}
          className='mt-2 md:line-clamp-3 line-clamp-2'
        >
          {slideArray[currentIndex].overview}
        </span>
        <div className='mt-3 flex row items-center justify-between'>
          <span className='flex row'>
            <Star className='mt-[2px]' size={24} color='#c00' weight='fill' />
            <span className='text-lg ml-2 font-bold line-clamp-3'>
              {slideArray[currentIndex].vote_average.toFixed(1)}
            </span>
          </span>

          <a
            aria-label={`Botão para saber mais sobre ${slideArray[currentIndex].title}`}
            href='#'
            className='min-w-auto flex items-center justify-center px-2 bg-customColors-red-500 rounded'
          >
            <NavLink
              to={`/movie/${slideArray[currentIndex].id}`}
              className='p-1 m-auto text-white'
            >
              Leia Mais
            </NavLink>
          </a>
        </div>

        {movieGenresList && movieGenresList.genres.length > 0 ? (
          <ul
            aria-label={`Lista dos gêneros do filme:  ${slideArray[currentIndex].title}`}
            className='mt-3 md:flex flex-wrap gap-x-2 row hidden'
          >
            {movieGenresList.genres.map((genre, id: number) => {
              return slideArray[currentIndex].genre_ids
                .slice(0, 5)
                .includes(genre.id) ? (
                <li
                  key={id}
                  title={genre.name}
                  aria-label={genre.name}
                  className='mb-1 flex bg-black/10 rounded-md border-2 border-customColors-red-500 cursor-default'
                >
                  <p className='m-auto p-1'>{genre.name}</p>
                </li>
              ) : null;
            })}
          </ul>
        ) : null}
      </div>
    </>
  );
}
