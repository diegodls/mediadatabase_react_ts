import { CaretLeft, CaretRight } from "phosphor-react";
import { useRef, useState } from "react";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { HomeListItem } from "./HomeListItem";
import { HomeListItemSkeleton } from "./HomeListItemSkeleton";

interface IListRowProps<T> {
  rowTitle?: string;
  type?: string;
  data?: T[];
}

export function HomeList<T>({
  rowTitle,
  type,
  data,
}: IListRowProps<
  T & { id: number; title?: string; name?: string; poster_path?: string }
>) {
  const { popularMovies } = usePopularMovies();
  const listRef = useRef<HTMLUListElement>(null);

  const [isMouseOverList, setIsMouseOverList] = useState<boolean>(false);

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
      listRef.current.scrollLeft += listRef.current?.offsetWidth;
    }
  }

  //popularMovies && popularMovies?.length > 0

  return (
    <div className='w-full flex flex-col relative mt-2'>
      <strong className='px-5 text-lg'>{rowTitle}</strong>
      <div
        onMouseEnter={() => {
          setIsMouseOverList(true);
        }}
        onMouseLeave={() => {
          setIsMouseOverList(false);
        }}
        className='w-full h-48 md:h-64 flex flex-col relative'
      >
        {popularMovies && popularMovies?.length > 0 ? (
          <div className='w-full h-full relative'>
            <button
              aria-label='Scroll para esquerda'
              title='Scroll para esquerda'
              onClick={handleScrollLeft}
              className={`w-9 h-full flex items-center justify-center bg-black/50 hover:bg-black/80 rounded-r-sm overflow-hidden absolute left-0 z-20 cursor-pointer transition-all select-none ${
                isMouseOverList ? "opacity-100" : "opacity-0"
              }`}
            >
              <CaretLeft size={32} color='#ffffff' weight='fill' />
            </button>
            <button
              aria-label='Scroll para direita'
              title='Scroll para direita'
              onClick={handleScrollRight}
              className={`w-9 h-full flex items-center justify-center bg-black/50 hover:bg-black/80 rounded-l-sm overflow-hidden absolute right-0 z-20 cursor-pointer transition-all select-none  ${
                isMouseOverList ? "opacity-100" : "opacity-0"
              }`}
            >
              <CaretRight size={32} color='#ffffff' weight='fill' />
            </button>
            <ul
              className='w-full h-full px-10 flex flex-row items-center relative transition-all overflow-x-scroll scroll-smooth scrollbar-hide'
              ref={listRef}
              role='list'
            >
              {data?.map((item) => (
                <HomeListItem
                  title={item.title || item.name}
                  poster_path={
                    item.poster_path
                      ? item.poster_path
                      : "https://cdn.w600.comps.canstockphoto.com.br/projetos-poster-glitched-tipogr%C3%A1fico-vetor-clip-arte_csp40896763.jpg"
                  }
                  key={item.id}
                />
              ))}
            </ul>
          </div>
        ) : (
          <ul
            className='w-full h-full px-10 flex flex-row items-center relative overflow-hidden'
            role='list'
          >
            {Array(6)
              .fill(null)
              .map((_, itemIndex, array) => (
                <HomeListItemSkeleton
                  key={itemIndex}
                  itemIndex={itemIndex}
                  array={array}
                />
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}