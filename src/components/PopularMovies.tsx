import { usePopularMovies } from "../hooks/usePopularMovies";
import { IPopularMoviesResults } from "../interfaces/IPopularMovies";
import { API_BASEURL_IMAGE_200 } from "../utils/constants";

export function PopularMovies() {
  const { popularMovies } = usePopularMovies();
  return (
    <>
      {popularMovies && popularMovies?.length && (
        <>
          <div className='w-full h-[266px] bg-red-500 '>
            <div className='w-full h-full flex flex-row items-center gap-2 bg-blue-500 relative'>
              {popularMovies.map((movie: IPopularMoviesResults) => (
                <div className='group min-w-[178px] h-full flex flex-col rounded-md relative bg-green-500'>
                  <div className='w-full bottom-0 group-hover:bottom-0 absolute z-20 animate bg-fuchsia-500'>
                    <p className='absolute z-20'>{movie.title}</p>

                    <div className='w-full h-12 bg-gradient-to-t from-customColors-background absolute z-10' />
                  </div>

                  <img
                    src={`${API_BASEURL_IMAGE_200 + movie.poster_path}`}
                    className='h-full'
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
