import { CaretLeft, CaretRight } from "phosphor-react";
import { useRef, useState } from "react";
import { HomeListItem } from "./HomeListItem";
import { HomeListItemSkeleton } from "./HomeListItemSkeleton";
import { Section } from "./IUSharedComponents/Section";

interface IListRowProps<T> {
  data?: T[];
  rowTitle?: string;
  titleBg?: boolean;
  type?: string;
}

export function HomeList<T>({
  data,
  rowTitle,
  titleBg = true,
  type,
}: IListRowProps<
  T & {
    id: number;
    title?: string;
    character?: string | null;
    name?: string;
    poster_path?: string;
    profile_path?: string | null;
  }
>) {
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

  return (
    <Section title={rowTitle} titleBg={titleBg}>
      <div
        onMouseEnter={() => {
          setIsMouseOverList(true);
        }}
        onMouseLeave={() => {
          setIsMouseOverList(false);
        }}
        className='w-full h-48 md:h-64 flex flex-col relative'
      >
        {data && data?.length > 0 ? (
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
              className='w-full h-full px-10 flex flex-row items-center relative transition-all overflow-x-scroll scroll-smooth hide-scrollbar'
              ref={listRef}
              role='list'
            >
              {data?.map((item) => {
                return (
                  <HomeListItem
                    title={item.title || item.name}
                    character={item.character ? item.character : null}
                    poster_path={item.poster_path || item.profile_path}
                    key={item.id}
                  />
                );
              })}
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
    </Section>
  );
}
