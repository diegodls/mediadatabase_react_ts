import { useEffect, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { IMovieKeywords } from "../interfaces/IMovieKeywords";
import { service } from "../services/api";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";
import { ErrorFetchContent } from "./ErrorFetchContent";
import { Section } from "./Section";

interface KeywordListProps {
  contentID?: string;
  title: string;
  type: MediaTypes;
}

export function KeywordList({ contentID, title, type }: KeywordListProps) {
  const [data, setData] = useState<IMovieKeywords | undefined>();
  const [dataErrorBasicFetch, setDataErrorBasicFetch] =
    useState<IErrorFetchContent>();

  async function fetchData(url: string) {
    const data = await service
      .get<Promise<IMovieKeywords>>(url)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        setDataErrorBasicFetch(err);
      });

    if (data) {
      setData(data);
    }
  }

  useEffect(() => {
    fetchData(`/movie/${contentID}/keywords`);
  }, [contentID]);

  return (
    <Section title={title}>
      <ErrorFetchContent error={dataErrorBasicFetch}>
        {data && data.keywords.length > 0 ? (
          <ul role='list' className='mt-4 flex flex-row gap-2 flex-wrap'>
            {data.keywords.slice(0, 5).map((keyword) => (
              <li
                key={keyword.id}
                title={keyword.name}
                aria-label={keyword.name}
                className='mb-1 p-1 px-3 flex bg-black/10 rounded-full border-2 border-customColors-red-500 cursor-pointer'
              >
                <p className='m-auto capitalize'>{keyword.name}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </ErrorFetchContent>
    </Section>
  );
}
