import { ISimilarMoviesResult } from "../interfaces/ISimilarMovies";

interface ISimilarMovies {
  data?: ISimilarMoviesResult[];
}

export function SimilarMovies({ data }: ISimilarMovies) {
  return (
    <div className='w-full'>
      <div className='mx-5 flex flex-col gap-4'>
        <strong className='text-xl'>Você também pode gostar</strong>
      </div>
      <h1>SimilarMovies</h1>
      <h2>{data?.length}</h2>
    </div>
  );
}
