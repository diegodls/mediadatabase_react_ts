import { CaretLeft, CaretRight } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";

interface IListRowProps {
  children: React.ReactNode;
  title?: string;
  error?: IErrorFetchContent;
}

export function ScrollableComponent({ children, title, error }: IListRowProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const [isMouseOverList, setIsMouseOverList] = useState<boolean>(false);
  const [isScrollable, setIsScrollable] = useState<boolean>(true);

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

  useEffect(() => {
    if (!listRef.current) return;

    listRef.current?.scrollWidth > listRef.current?.clientWidth
      ? setIsScrollable(true)
      : setIsScrollable(false);
  }, [listRef]);

  return (
    <>
      {children ? (
        <div
          onMouseEnter={() => {
            setIsMouseOverList(true);
          }}
          onMouseLeave={() => {
            setIsMouseOverList(false);
          }}
          className='w-full h-full flex flex-col relative'
        >
          <div
            className={`w-full flex gap-2 mb-2 bg-orange-500 overflow-hidden whitespace-nowrap`}
          >
            <p>isScrollable: {isScrollable ? "Sim" : "Nope"}</p>
            <p>clientWidth: {listRef.current?.clientWidth}</p>
            <p>offsetWidth: {listRef.current?.offsetWidth}</p>
            <p>scrollWidth: {listRef.current?.scrollWidth}</p>
            <p>scrollLeft: {listRef.current?.scrollLeft}</p>
            <p>clientHeight: {listRef.current?.clientHeight}</p>
            <p>offsetHeight: {listRef.current?.offsetHeight}</p>
          </div>

          <div className='w-full h-full relative bg-fuchsia-500 overflow-hidden'>
            {isScrollable ? (
              <>
                <button
                  aria-label='Scroll para esquerda'
                  title='Scroll para esquerda'
                  onClick={handleScrollLeft}
                  className={`w-9 h-full flex items-center justify-center bg-black/20 hover:bg-black/80 rounded-r-sm overflow-hidden absolute left-0 z-50 cursor-pointer transition-all select-none ${
                    isMouseOverList ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <CaretLeft size={32} color='#ffffff' weight='fill' />
                </button>
                <button
                  aria-label='Scroll para direita'
                  title='Scroll para direita'
                  onClick={handleScrollRight}
                  className={`w-9 h-full flex items-center justify-center bg-black/50 hover:bg-black/80 rounded-l-sm overflow-hidden absolute right-0 z-50 cursor-pointer transition-all select-none  ${
                    isMouseOverList ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <CaretRight size={32} color='#ffffff' weight='fill' />
                </button>
              </>
            ) : null}

            <div
              className={`w-full h-full bg-blue-500 overflow-hidden relative`}
              ref={listRef}
            >
              {children}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
