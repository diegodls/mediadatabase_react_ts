import { IPopularMoviesResults } from "../interfaces/IPopularMovies";
import { API_BASEURL_IMAGE_200 } from "../utils/constants";

interface PopularMoviesListItemProps {
  movie: IPopularMoviesResults;
}

export function PopularMoviesListItem({ movie }: PopularMoviesListItemProps) {
  return (
    <li className='group min-w-fit h-full flex flex-col rounded-md cursor-pointer relative overflow-hidden transform hover:scale-110 transition-all'>
      <div className='w-full h-12 flex items-center absolute z-20 bottom-0 translate-y-12 group-hover:translate-y-0 transition-all ease-in opacity-0 group-hover:opacity-100'>
        <p className='font-bold pl-2 absolute z-20 line-clamp-1 overflow-hidden scale-90'>
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
