import { useRef, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { IRecommendedResult } from "../interfaces/IRecommended";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";
import { ErrorFetchContent } from "./ErrorFetchContent";
import { ListItem } from "./ListItem";
import { Section } from "./Section";

interface IRecommendedProps<T> {
  data: (T[] & IRecommendedResult[]) | IRecommendedResult[] | undefined;
  error?: IErrorFetchContent;
}

export function Recommended<T>({ data, error }: IRecommendedProps<T>) {
  const listRef = useRef<HTMLUListElement>(null);
  const listHeightShowSize = 208; // h-52 or 13rem
  const componentType: MediaTypes = "movie";

  const [showMore, setShowMore] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  function handleResize() {
    if (
      listRef.current?.scrollHeight &&
      listRef.current?.scrollHeight > listHeightShowSize
    ) {
      setShowMore(true);
    }
  }

  function handleCollapse() {
    setIsCollapsed((prev) => !prev);

    if (!isCollapsed) {
      setTimeout(() => {
        listRef.current?.scrollIntoView();
      }, 250);
    }
  }

  return (
    <Section title={"Você também pode gostar"}>
      <ErrorFetchContent error={error}>
        {data && data.length > 0 ? (
          <div className='w-full relative'>
            <div
              className={`w-full ${
                isCollapsed ? "max-h-auto" : "max-h-52"
              } justify-center overflow-hidden relative`}
            >
              <ul
                ref={listRef}
                className='w-full h-full flex flex-row flex-wrap justify-center relative'
              >
                {data.map((similarMovie, _) => {
                  return (
                    <ListItem
                      title={similarMovie.title || similarMovie.original_title}
                      poster_path={similarMovie.poster_path}
                      url={`/${componentType}/${similarMovie.id}`}
                      key={similarMovie.id}
                    />
                  );
                })}
              </ul>
              <div
                className={`w-full h-12 bottom-0 bg-gradient-to-t from-customColors-background absolute z-40 ${
                  isCollapsed ? "hidden" : ""
                }`}
              />
            </div>
            {showMore ? (
              <div
                className={`w-full h-12 flex justify-center items-center relative ${
                  isCollapsed ? "mt-2" : "mt-[-2rem]"
                }`}
              >
                <button
                  aria-label={`${
                    isCollapsed ? "Mostrar Menos" : "Mostrar Mais"
                  } filmes similares`}
                  title={`${
                    isCollapsed ? "Mostrar Menos" : "Mostrar Mais"
                  } filmes similares`}
                  className={`px-4 py-2 rounded flex bg-customColors-background border-2 border-customColors-red-500  absolute z-40`}
                  onClick={() => {
                    handleCollapse();
                  }}
                >
                  <strong>
                    {isCollapsed ? "Mostrar Menos" : "Mostrar Mais"}
                  </strong>
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </ErrorFetchContent>
    </Section>
  );
}
