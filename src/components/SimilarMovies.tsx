import { useEffect, useRef, useState } from "react";
import { ISimilarMoviesResult } from "../interfaces/ISimilarMovies";
import { HomeListItem } from "./HomeListItem";
import { Section } from "./Section";

interface ISimilarMovies {
  similarMovies: ISimilarMoviesResult[] | undefined;
}

export function SimilarMovies({ similarMovies }: ISimilarMovies) {
  const listRef = useRef<HTMLUListElement>(null);
  const listHeightShowSize = 208; // h-52 or 13rem

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

  return similarMovies && similarMovies.length > 0 ? (
    <Section title='Você também pode gostar'>
      <div
        className={`w-full ${
          isCollapsed ? "max-h-auto" : "max-h-52"
        } justify-center overflow-hidden`}
      >
        <ul
          ref={listRef}
          className='w-full h-full flex flex-row flex-wrap justify-center'
        >
          {similarMovies.map((similarMovie, _) => {
            return (
              <li key={similarMovie.id} className='h-52 flex'>
                <HomeListItem
                  title={similarMovie.title || similarMovie.original_title}
                  poster_path={similarMovie.poster_path}
                  type={"movie"}
                  contentID={similarMovie.id}
                />
              </li>
            );
          })}
        </ul>
      </div>
      {showMore ? (
        <button
          className={`w-full h-8 flex justify-center bg-gradient-to-t from-black`}
          onClick={() => {
            handleCollapse();
          }}
        >
          <strong>{isCollapsed ? "Mostrar Menos" : "Mostrar Mais"}</strong>
        </button>
      ) : null}
    </Section>
  ) : null;
}
