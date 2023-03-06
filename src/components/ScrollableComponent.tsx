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
  const LIST_ITEM_AMOUNT = 20;

  const [isMouseOverList, setIsMouseOverList] = useState<boolean>(false);
  const [isScrollable, setIsScrollable] = useState<boolean>(false);

  function handleResizeWindow() {
    if (!listRef.current) return;

    listRef.current?.scrollWidth > listRef.current?.clientWidth
      ? setIsScrollable(true)
      : setIsScrollable(false);
  }

  function handleScroll(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: "LEFT" | "RIGHT"
  ) {
    e.preventDefault();
    handleResizeWindow();

    console.log("");
    console.log("handleScroll");

    if (!listRef.current) return;

    const ITEM_HEIGHT = listRef.current?.scrollWidth / LIST_ITEM_AMOUNT;

    const currentDistance = listRef.current?.getBoundingClientRect().x;

    let moveTo = 0;

    console.log("_____ANTES");
    console.log({
      type,
      moveTo,
      ITEM_HEIGHT,
      currentDistance,
    });

    if (type === "LEFT") {
      moveTo = ITEM_HEIGHT + currentDistance;
      console.log(`_____moveTo LEFT: ${moveTo}`);
    }

    if (type === "RIGHT") {
      moveTo = -ITEM_HEIGHT + currentDistance;
      console.log(`__________moveTo RIGHT: ${moveTo}`);
    }

    if (moveTo >= 0 || moveTo < currentDistance - ITEM_HEIGHT) {
      console.log(`__________moveTo 0: ${moveTo}`);

      moveTo = 0;
    }

    listRef.current.style.transform = `translateX(${moveTo}px)`;

    console.log("_____DEPOIS");
    console.log({
      type,
      moveTo,
      ITEM_HEIGHT,
      currentDistance,
    });
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
            handleResizeWindow();
            setIsMouseOverList(true);
          }}
          onMouseLeave={() => {
            handleResizeWindow();
            setIsMouseOverList(false);
          }}
          className='w-full h-full flex flex-col relative'
        >
          <div className='w-full h-full overflow-hidden'>
            {isScrollable ? (
              <>
                <button
                  aria-label='Scroll para esquerda'
                  title='Scroll para esquerda'
                  onClick={(e) => handleScroll(e, "LEFT")}
                  className={`w-[${BUTTON_WIDTH}px] h-full flex items-center justify-center scale-y-90 bg-black/20 hover:bg-black/80 rounded-r-sm overflow-hidden absolute left-0 z-50 cursor-pointer transition-all select-none ${
                    isMouseOverList ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <CaretLeft size={32} color='#ffffff' weight='fill' />
                </button>
                <button
                  aria-label='Scroll para direita'
                  title='Scroll para direita'
                  onClick={(e) => handleScroll(e, "RIGHT")}
                  className={`w-[${BUTTON_WIDTH}px] h-full flex items-center justify-center scale-y-90 bg-black/50 hover:bg-black/80 rounded-l-sm overflow-hidden absolute right-0 z-50 cursor-pointer transition-all select-none  ${
                    isMouseOverList ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <CaretRight size={32} color='#ffffff' weight='fill' />
                </button>
              </>
            ) : null}

            <div
              className={`w-full h-full hide-scrollbar scroll-smooth overflow-hidden overflow-x-scroll ${
                !isScrollable ? "flex justify-center" : ""
              }`}
            >
              <div
                className='w-auto h-full hide-scrollbar scroll-smooth transition-all'
                ref={listRef}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
