import { usePopularMovies } from "../hooks/usePopularMovies";
import { IPopularMoviesResults } from "../interfaces/IPopularMovies";
import { PopularMoviesListItem } from "./PopularMoviesListItem";
import { PopularMoviesListItemSkeleton } from "./PopularMoviesListItemSkeleton";

export function PopularMoviesList() {
  const { popularMovies } = usePopularMovies();
  //popularMovies && popularMovies?.length > 0
  return (
    <>
      <div className='w-full h-44 md:h-56'>
        {popularMovies && popularMovies?.length > 0 ? (
          <ul className='w-full h-full flex flex-row items-center gap-2 relative overflow-hidden'>
            {popularMovies?.map((movie: IPopularMoviesResults) => (
              <PopularMoviesListItem movie={movie} key={movie.id} />
            ))}
          </ul>
        ) : (
          <ul className='w-full h-full flex flex-row items-center gap-2 relative'>
            {Array(4)
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
