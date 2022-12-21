import { ISimilarMoviesResult } from "../interfaces/ISimilarMovies";
import { SectionTitle } from "./IUSharedComponents/SectionTitle";

interface ISimilarMovies {
  data?: ISimilarMoviesResult[];
}

export function SimilarMovies({ data }: ISimilarMovies) {
  return (
    <div className='w-full'>
      <div className='mx-5 flex flex-col gap-4'>
        <SectionTitle title={"Você também pode gostar"} />
      </div>
      <h1>SimilarMovies</h1>
      <h2>{data?.length}</h2>
    </div>
  );
}
