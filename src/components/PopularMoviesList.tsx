import { CaretLeft, CaretRight } from "phosphor-react";
import { useState } from "react";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { IPopularMoviesResults } from "../interfaces/IPopularMovies";
import { PopularMoviesListItem } from "./PopularMoviesListItem";
import { PopularMoviesListItemSkeleton } from "./PopularMoviesListItemSkeleton";

export function PopularMoviesList() {
  const { popularMovies } = usePopularMovies();

  const [scrollX, setScrollX] = useState<number>(36);

  const itemWidth = 150; //in pixels
  const scrollButtonWidth = 36; //in pixels
  const itemGap = 8; //in pixels
  const itemsGapAmount = popularMovies ? (popularMovies?.length - 1) * 8 : 0;

  function handleScrollLeft() {
    let x = scrollX + Math.round(window.innerWidth / 2);

    if (x > scrollButtonWidth || x > scrollButtonWidth - itemWidth) {
      x = scrollButtonWidth;
    }

    setScrollX(x);
  }

  function handleScrollRight() {
    let listWidth = popularMovies
      ? popularMovies?.length * itemWidth + itemsGapAmount
      : 0;

    let listCompleteWidth =
      (listWidth - window.innerWidth + scrollButtonWidth + itemGap) * -1;

    let x = scrollX - Math.round(window.innerWidth / 2);

    if (x < scrollX - itemWidth - itemGap) {
      (listWidth - window.innerWidth + scrollButtonWidth + itemGap) * -1;
    }

    if (window.innerWidth - listWidth > x) {
      x = window.innerWidth - listWidth - scrollButtonWidth - itemGap;
    }

    if (x - listCompleteWidth < itemWidth + itemGap) {
      x = listCompleteWidth;
    }

    setScrollX(x);
  }

  //popularMovies && popularMovies?.length > 0

  return (
    <>
      {scrollX}
      <div className='group/edit w-full h-44 md:h-56 flex items-center relative top-[-10px]'>
        <span
          onClick={handleScrollLeft}
          className='w-9 h-full flex items-center justify-center bg-black/50 hover:bg-black/80 rounded-r-sm overflow-hidden absolute left-0 z-20 cursor-pointer opacity-100 group-hover/edit:opacity-100 transition-all select-none'
        >
          <CaretLeft size={32} color='#ffffff' weight='fill' />
        </span>
        <span
          onClick={handleScrollRight}
          className='w-9 h-full flex items-center justify-center bg-black/50 hover:bg-black/80 rounded-l-sm overflow-hidden absolute right-0 z-20 cursor-pointer opacity-100 group-hover/edit:opacity-100 transition-all select-none'
        >
          <CaretRight size={32} color='#ffffff' weight='fill' />
        </span>
        {popularMovies && popularMovies?.length > 0 ? (
          <ul
            className='w-full h-full flex flex-row items-center gap-2 relative transition-all'
            role='list'
            style={{ marginLeft: scrollX }}
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
