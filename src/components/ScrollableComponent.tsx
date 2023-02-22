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
  const BUTTON_WIDTH = 36; //in pixels

  const [isMouseOverList, setIsMouseOverList] = useState<boolean>(false);
  const [isScrollable, setIsScrollable] = useState<boolean>(false);

  function handleScrollLeft(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if (!listRef.current) return;
    listRef.current.scrollLeft -= listRef.current
      ? listRef.current?.offsetWidth
      : 0;
  }

  function handleScrollRight(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    if (!listRef.current) return;

    listRef.current.scrollLeft += listRef.current?.offsetWidth;
  }

  function handleResizeWindow() {
    if (!listRef.current) return;

    listRef.current?.scrollWidth > listRef.current?.clientWidth
      ? setIsScrollable(true)
      : setIsScrollable(false);
  }

  useEffect(() => {
    handleResizeWindow();
  }, [listRef]);

  useEffect(() => {
    window.addEventListener("resize", handleResizeWindow);

    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  return (
    <>
      {children ? (
        <div
          onMouseEnter={() => {
            setIsMouseOverList(true);
          }}
          onMouseLeave={() => {
            setIsMouseOverList(true);
          }}
          className='w-full h-full flex flex-col relative'
        >
          <div className='w-full flex  gap-2 bg-yellow-500 text-black'>
            <p className='whitespace-nowrap'>
              clientWidth: {listRef.current?.clientWidth}
            </p>
            <p className='whitespace-nowrap'>
              scrollWidth: {listRef.current?.scrollWidth}
            </p>
            <p className='whitespace-nowrap'>
              offsetWidth: {listRef.current?.offsetWidth}
            </p>
            <p className='whitespace-nowrap'>
              scrollLeft: {listRef.current?.scrollLeft}
            </p>
          </div>
          <div className='w-full h-full overflow-hidden'>
            {isScrollable ? (
              <>
                <button
                  aria-label='Scroll para esquerda'
                  title='Scroll para esquerda'
                  onClick={handleScrollLeft}
                  className={`w-[${BUTTON_WIDTH}px] h-full flex items-center justify-center bg-black/20 hover:bg-black/80 rounded-r-sm overflow-hidden absolute left-0 z-50 cursor-pointer transition-all select-none ${
                    isMouseOverList ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <CaretLeft size={32} color='#ffffff' weight='fill' />
                </button>
                <button
                  aria-label='Scroll para direita'
                  title='Scroll para direita'
                  onClick={handleScrollRight}
                  className={`w-[${BUTTON_WIDTH}px] h-full flex items-center justify-center bg-black/50 hover:bg-black/80 rounded-l-sm overflow-hidden absolute right-0 z-50 cursor-pointer transition-all select-none  ${
                    isMouseOverList ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <CaretRight size={32} color='#ffffff' weight='fill' />
                </button>
              </>
            ) : null}

            <div
              className={`w-full h-full scroll-smooth bg-green-500 overflow-hidden ${
                !isScrollable ? "flex justify-center" : ""
              }`}
              ref={listRef}
            >
              <div className='w-auto h-full mx-9 bg-blue-500'>{children}</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
