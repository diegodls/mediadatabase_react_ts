import { useEffect, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { IMovieCredits } from "../interfaces/IMovieCredits";
import { service } from "../services/api";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";
import { ErrorFetchContent } from "./ErrorFetchContent";
import { List } from "./List";
import { Section } from "./Section";

interface CastListProps {
  contentID?: string;
  title: string;
  type: MediaTypes;
}

export function CastList({ contentID, title, type }: CastListProps) {
  const [data, setData] = useState<IMovieCredits | undefined>();
  const [dataErrorBasicFetch, setDataErrorBasicFetch] =
    useState<IErrorFetchContent>();

  async function fetchData(url: string) {
    const data = await service
      .get<Promise<IMovieCredits>>(url)
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
    fetchData(`/${type}/${contentID}/credits`);
  }, [contentID]);

  return (
    <Section title={title}>
      <ErrorFetchContent error={dataErrorBasicFetch}>
        {data && data.cast.length > 0 ? (
          <List data={data.cast} type='person' />
        ) : null}
      </ErrorFetchContent>
    </Section>
  );
}
