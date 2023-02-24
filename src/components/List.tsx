import { CaretLeft, CaretRight } from "phosphor-react";
import { useRef, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";
import { ErrorFetchContent } from "./ErrorFetchContent";
import { ListItem } from "./ListItem";
import { ListItemSkeleton } from "./ListItemSkeleton";
import { Section } from "./Section";

interface IListRowProps<T> {
  data: T[] | undefined;
  type?: MediaTypes;
  title?: string;
  error?: IErrorFetchContent;
  titleBg?: boolean;
}

interface IMock {
  id: number;
  title?: string;
  character?: string | null;
  name?: string;
  poster_path?: string;
  profile_path?: string | null;
}

export function List<T>({
  data,
  type,
  title,
  error,
  titleBg,
}: IListRowProps<T & IMock>) {
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
    <Section title={title} titleBg={titleBg}>
      <ErrorFetchContent error={error}>
        {data && data?.length > 0 ? (
          <div
            onMouseEnter={() => {
              setIsMouseOverList(true);
            }}
            onMouseLeave={() => {
              setIsMouseOverList(false);
            }}
            className='w-full h-64 flex flex-col relative'
          >
            <div className='w-full h-full relative'>
              <button
                aria-label='Scroll para esquerda'
                title='Scroll para esquerda'
                onClick={handleScrollLeft}
                className={`w-9 h-full flex items-center justify-center bg-black/20 hover:bg-black/80 rounded-r-sm overflow-hidden absolute left-0 z-20 cursor-pointer transition-all select-none ${
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
                className='w-full h-full flex flex-row items-center relative transition-all overflow-x-scroll scroll-smooth hide-scrollbar'
                ref={listRef}
                role='list'
              >
                {data?.map((item) => {
                  return (
                    <ListItem
                      title={item.title || item.name}
                      character={item.character ? item.character : null}
                      poster_path={item.poster_path || item.profile_path}
                      key={`${item.id}${item.name ? "-" + item.name : ""}${
                        item.character ? "-" + item.character : ""
                      }`}
                      url={`/${type}/${item.id}`}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        ) : (
          <div className='w-full h-48 md:h-64 flex flex-col relative'>
            <ul
              className='w-full h-full px-10 flex flex-row items-center relative overflow-hidden'
              role='list'
            >
              {Array(6)
                .fill(null)
                .map((_, itemIndex, array) => (
                  <ListItemSkeleton
                    key={itemIndex}
                    itemIndex={itemIndex}
                    array={array}
                  />
                ))}
            </ul>
          </div>
        )}
      </ErrorFetchContent>
    </Section>
  );
}
