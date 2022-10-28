import { usePopularMovies } from "../hooks/usePopularMovies";
import { IPopularMoviesResults } from "../interfaces/IPopularMovies";
import { PopularMoviesListItem } from "./PopularMoviesListItem";
import { PopularMoviesListItemSkeleton } from "./PopularMoviesListItemSkeleton";

export function PopularMoviesList() {
  const { popularMovies } = usePopularMovies();

  return (
    <>
      {popularMovies && popularMovies?.length > 0 ? (
        <div className='w-full h-32 md:h-64 overflow-hidden'>
          <ul className='w-full h-full flex flex-row items-center gap-2 relative overflow-hidden'>
            {popularMovies?.map((movie: IPopularMoviesResults) => (
              <PopularMoviesListItem movie={movie} />
            ))}
          </ul>
        </div>
      ) : (
        <ul className='w-full h-32 md:h-64 flex flex-row gap-2 overflow-hidden'>
          {Array(5)
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
    </>
  );
}
