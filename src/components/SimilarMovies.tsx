import { ISimilarMoviesResult } from "../interfaces/ISimilarMovies";
import { Section } from "./IUSharedComponents/Section";

interface ISimilarMovies {
  data?: ISimilarMoviesResult[];
}

export function SimilarMovies({ data }: ISimilarMovies) {
  return (
    <Section title='Você também pode gostar'>
      <h1>SimilarMovies</h1>
      <h2>{data?.length}</h2>
    </Section>
  );
}
