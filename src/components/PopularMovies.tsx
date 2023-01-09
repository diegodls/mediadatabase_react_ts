import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { IPopularMoviesResults } from "../interfaces/IPopularMovies";
import { ErrorFetchContent } from "./ErrorFetchContent";
import { List } from "./List";
import { Section } from "./Section";

interface PopularMoviesProps {
  data?: IPopularMoviesResults[];
  error?: IErrorFetchContent;
}

export function PopularMovies({ data, error }: PopularMoviesProps) {
  return (
    <Section title={"Filmes Populares"}>
      <ErrorFetchContent error={error}>
        {data && data.length > 0 ? <List data={data} type={"movie"} /> : null}
      </ErrorFetchContent>
    </Section>
  );
}
