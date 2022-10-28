import { IPopularMoviesResults } from "../interfaces/IPopularMovies";
import { API_BASEURL_IMAGE_200 } from "../utils/constants";

interface PopularMoviesListItemProps {
  movie: IPopularMoviesResults;
}

export function PopularMoviesListItem({ movie }: PopularMoviesListItemProps) {
  return (
    <li
      key={movie.id}
      className='group min-w-fit h-full flex flex-col rounded-md relative overflow-hidden'
    >
      <div className='w-full h-12 flex items-center bottom-[-3rem] group-hover:bottom-0 absolute z-20 group-hover:transition-all'>
        <p className='p-2 font-bold absolute z-20 line-clamp-2'>
          {movie.title}
        </p>

        <div className='w-full h-12 bg-gradient-to-t from-customColors-background absolute z-10' />
      </div>

      <img
        src={`${API_BASEURL_IMAGE_200 + movie.poster_path}`}
        className='h-full'
      />
    </li>
  );
}
