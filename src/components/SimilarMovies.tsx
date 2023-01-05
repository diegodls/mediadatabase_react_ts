import { useEffect, useRef, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import {
  ISimilarMovies,
  ISimilarMoviesResult,
} from "../interfaces/ISimilarMovies";
import { service } from "../services/api";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";
import { ErrorFetchContent } from "./ErrorFetchContent";
import { ListItem } from "./ListItem";
import { Section } from "./Section";

interface ISimilarMoviesProps {
  contentID?: string;
  title: string;
  type: MediaTypes;
}

export function SimilarMovies({ contentID, title, type }: ISimilarMoviesProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const listHeightShowSize = 208; // h-52 or 13rem
  const componentType: MediaTypes = "movie";

  const [showMore, setShowMore] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [data, setData] = useState<ISimilarMoviesResult[] | undefined>();
  const [dataErrorBasicFetch, setDataErrorBasicFetch] =
    useState<IErrorFetchContent>();

  async function fetchData(url: string) {
    const data = await service
      .get<Promise<ISimilarMovies>>(url)
      .then((res) => {
        console.log(res);

        return res.data;
      })
      .catch((err) => {
        setDataErrorBasicFetch(err);
      });

    if (data) {
      setData(data.results);
    }
  }

  useEffect(() => {
    setIsCollapsed(false);
    fetchData(`/${type}/${contentID}/similar`);
  }, [contentID]);

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
    <Section title={title}>
      <ErrorFetchContent error={dataErrorBasicFetch}>
        {data && data.length > 0 ? (
          <>
            <div
              className={`w-full ${
                isCollapsed ? "max-h-auto" : "max-h-52"
              } justify-center overflow-hidden`}
            >
              <ul
                ref={listRef}
                className='w-full h-full flex flex-row flex-wrap justify-center'
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
              <button
                className={`w-full h-8 flex justify-center bg-gradient-to-t from-black`}
                onClick={() => {
                  handleCollapse();
                }}
              >
                <strong>
                  {isCollapsed ? "Mostrar Menos" : "Mostrar Mais"}
                </strong>
              </button>
            ) : null}
          </>
        ) : null}
      </ErrorFetchContent>
    </Section>
  );
}
