import { CaretLeft, CaretRight } from "phosphor-react";
import { useRef } from "react";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { IPopularMoviesResults } from "../interfaces/IPopularMovies";
import { PopularMoviesListItem } from "./PopularMoviesListItem";
import { PopularMoviesListItemSkeleton } from "./PopularMoviesListItemSkeleton";

export function PopularMoviesList() {
  const { popularMovies } = usePopularMovies();

  const listRef = useRef<HTMLUListElement>(null);

  function handleScrollLeft(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if (listRef.current) {
      listRef.current.scrollLeft -= listRef.current
        ? listRef.current?.offsetWidth
        : 0;
    }
  }

  function handleScrollRight(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if (listRef.current) {
      listRef.current.scrollLeft += listRef.current
        ? listRef.current?.offsetWidth
        : 0;
    }
  }

  //popularMovies && popularMovies?.length > 0

  return (
    <>
      <div className='group/edit w-full h-48 md:h-64 flex items-center relative top-[-10px]'>
        <button
          aria-label='Scroll para esquerda'
          title='Scroll para esquerda'
          onClick={handleScrollLeft}
          className='w-9 h-full flex items-center justify-center bg-black/50 hover:bg-black/80 rounded-r-sm overflow-hidden absolute left-0 z-20 cursor-pointer opacity-100 group-hover/edit:opacity-100 transition-all select-none'
        >
          <CaretLeft size={32} color='#ffffff' weight='fill' />
        </button>
        <button
          aria-label='Scroll para direita'
          title='Scroll para direita'
          onClick={handleScrollRight}
          className='w-9 h-full flex items-center justify-center bg-black/50 hover:bg-black/80 rounded-l-sm overflow-hidden absolute right-0 z-20 cursor-pointer opacity-100 group-hover/edit:opacity-100 transition-all select-none'
        >
          <CaretRight size={32} color='#ffffff' weight='fill' />
        </button>
        {popularMovies && popularMovies?.length > 0 ? (
          <ul
            className='w-full h-full px-9 flex flex-row items-center relative transition-all overflow-x-scroll scroll-smooth scrollbar-hide'
            ref={listRef}
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
