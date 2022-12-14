import { useEffect, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import {
  IUpcomingMoviesApiReturn,
  IUpcomingMoviesResults,
} from "../interfaces/IUpcomingMovies";
import { service } from "../services/api";
import { ErrorFetchContent } from "./ErrorFetchContent";
import { List } from "./List";
import { Section } from "./Section";

export function PopularTvShows() {
  const [data, setData] = useState<IUpcomingMoviesResults[]>();
  const [dataErrorBasicFetch, setDataErrorBasicFetch] =
    useState<IErrorFetchContent>();

  async function fetchData(url: string) {
    const data = await service
      .get<Promise<IUpcomingMoviesApiReturn>>(url)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        setDataErrorBasicFetch(err);
      });

    if (data && data.results.length > 0) {
      setData(data.results);
    }
  }

  useEffect(() => {
    fetchData("/tv/upcoming/");
  }, []);

  return (
    <Section title={"Próximos Filmes a Serem Lançados"}>
      <ErrorFetchContent error={dataErrorBasicFetch}>
        {data && data.length > 0 ? <List data={data} type={"movie"} /> : null}
      </ErrorFetchContent>
    </Section>
  );
}
