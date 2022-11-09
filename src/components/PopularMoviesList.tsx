import { CaretLeft, CaretRight } from "phosphor-react";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { IPopularMoviesResults } from "../interfaces/IPopularMovies";
import { PopularMoviesListItem } from "./PopularMoviesListItem";
import { PopularMoviesListItemSkeleton } from "./PopularMoviesListItemSkeleton";

export function PopularMoviesList() {
  const { popularMovies } = usePopularMovies();
  //popularMovies && popularMovies?.length > 0
  return (
    <>
      <div className='group/edit w-full h-44 md:h-56 flex items-center relative top-[-10px]'>
        <span className='h-full flex items-center bg-black/50 hover:bg-black/80 rounded-r-sm overflow-hidden absolute left-0 z-20 cursor-pointer opacity-100 group-hover/edit:opacity-100 transition-all'>
          <CaretLeft size={32} color='#ffffff' weight='fill' />
        </span>
        <span className='h-full flex items-center bg-black/50 hover:bg-black/80 rounded-l-sm overflow-hidden absolute right-0 z-20 cursor-pointer opacity-100 group-hover/edit:opacity-100 transition-all'>
          <CaretRight size={32} color='#ffffff' weight='fill' />
        </span>
        {popularMovies && popularMovies?.length > 0 ? (
          <ul
            className='w-full h-full flex flex-row items-center gap-2 ml-9 relative transform'
            role='list'
          >
            {popularMovies?.map((movie: IPopularMoviesResults) => (
              <PopularMoviesListItem movie={movie} key={movie.id} />
            ))}
          </ul>
        ) : (
          <ul
            className='w-full h-full ml-9 flex flex-row items-center gap-2 relative overflow-hidden'
            role='list'
          >
            {Array(6)
              .fill(null)
              .map((_, itemIndex, array) => (
                <PopularMoviesListItemSkeleton
                  key={itemIndex}
                  itemIndex={itemIndex}
                  array={array}
                />
              ))}
          </ul>
        )}
      </div>
    </>
  );
}
