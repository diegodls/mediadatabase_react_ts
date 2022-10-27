import { usePopularMovies } from "../hooks/usePopularMovies";
import { IPopularMoviesResults } from "../interfaces/IPopularMovies";
import { API_BASEURL_IMAGE_200 } from "../utils/constants";

export function PopularMoviesList() {
  const { popularMovies } = usePopularMovies();

  function calcOpacity(index: number, length: number) {
    const minOpacity: number = 10;
    const maxOpacity: number = 50;

    if (minOpacity >= maxOpacity) {
      return maxOpacity;
    }

    const opacityInterval = (maxOpacity - minOpacity) / (length - 1);
    const finalOpacity =
      (minOpacity + opacityInterval * (length - 1 - index)) / 100; //remover o "length -1" para mudar a ordem
    return finalOpacity.toFixed(1);
  }

  return (
    <>
      {popularMovies && popularMovies?.length > 0 ? (
        <div className='w-full h-32 md:h-64 overflow-hidden'>
          <div className='w-full h-full flex flex-row items-center gap-2 relative overflow-hidden'>
            {popularMovies?.map((movie: IPopularMoviesResults) => (
              <div
                key={movie.id}
                className='group min-w-fit h-full flex flex-col rounded-md relative overflow-hidden'
              >
                <div className='w-full h-12 flex items-center bottom-[-3rem] group-hover:bottom-0 absolute z-20 group-hover:transition-all'>
                  <p className='p-2 font-bold absolute z-20 line-clamp-2'>
                    {movie.title}
                  </p>

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
      ) : (
        <div className='w-full h-32 md:h-64 flex flex-row gap-2 overflow-hidden'>
          {Array(5)
            .fill(null)
            .map((_, itemIndex, array) => (
              <div
                className={`w-48 h-full rounded-md 
                bg-slate-500 opacity-[${calcOpacity(
                  itemIndex,
                  array.length
                )}] overflow-hidden`}
              >
                <h1>{calcOpacity(itemIndex, array.length)}</h1>
                <div className=' h-64 animate-diagonalMove'>
                  <div className='w-12 h-[500px] bg-gradient-to-r from-transparent via-stone-800/90 to-transparent transform rotate-45 translate-y-[-250px]' />
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
