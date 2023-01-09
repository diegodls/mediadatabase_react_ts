import { useEffect, useRef, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { ISimilarMoviesResult } from "../interfaces/ISimilarMovies";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";
import { ErrorFetchContent } from "./ErrorFetchContent";
import { ListItem } from "./ListItem";
import { Section } from "./Section";

interface ISimilarMoviesProps {
  data?: ISimilarMoviesResult[];
  error?: IErrorFetchContent;
}

export function SimilarMovies({ data, error }: ISimilarMoviesProps) {
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

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    setTimeout(() => {
      handleResize();
    }, 250);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Section title={"Você também pode gostar"}>
      <ErrorFetchContent error={error}>
        {data && data.length > 0 ? (
          <div className='w-full relative'>
            <div
              className={`w-full ${
                isCollapsed ? "max-h-auto" : "max-h-52"
              } justify-center overflow-hidden `}
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
            </div>
            {showMore ? (
              <div className='w-full flex justify-center items-center '>
                <button
                  aria-label={`${
                    isCollapsed ? "Mostrar Menos" : "Mostrar Mais"
                  } filmes similares`}
                  title={`${
                    isCollapsed ? "Mostrar Menos" : "Mostrar Mais"
                  } filmes similares`}
                  className={`mt-2 px-4 py-2 rounded flex bg-black/20 border-2 border-customColors-red-500`}
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
