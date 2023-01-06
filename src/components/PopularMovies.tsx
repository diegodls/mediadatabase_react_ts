import { useEffect, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import {
  IPopularMoviesApiReturn,
  IPopularMoviesResults,
} from "../interfaces/IPopularMovies";
import { service } from "../services/api";
import { ErrorFetchContent } from "./ErrorFetchContent";
import { List } from "./List";
import { Section } from "./Section";

export function PopularMovies() {
  const [data, setData] = useState<IPopularMoviesResults[]>();
  const [dataErrorBasicFetch, setDataErrorBasicFetch] =
    useState<IErrorFetchContent>();

  async function fetchData(url: string) {
    const data = await service
      .get<Promise<IPopularMoviesApiReturn>>(url)
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
    fetchData("/movie/popular");
  }, []);

  return (
    <Section title={"Filmes Populares"}>
      <ErrorFetchContent error={dataErrorBasicFetch}>
        {data && data.length > 0 ? <List data={data} type={"movie"} /> : null}
      </ErrorFetchContent>
    </Section>
  );
}
