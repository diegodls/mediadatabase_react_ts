import { useEffect, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { IMovieVideoResults, IMovieVideos } from "../interfaces/IMovieVideos";
import { ErrorFetchContent } from "./ErrorFetchContent";
import { Section } from "./Section";

interface MovieVideoProps {
  data?: IMovieVideos;
  error?: IErrorFetchContent;
}

export function MovieVideos({ data, error }: MovieVideoProps) {
  const [featuredMovie, SetFeaturedMovie] = useState<IMovieVideoResults>(
    data?.results[0] || ({} as IMovieVideoResults)
  );

  useEffect(() => {
    if (data && data.results.length > 0) {
      SetFeaturedMovie(data?.results[0]);
    }
  }, [data]);

  function handleChangeFeaturedMovie(movie: IMovieVideoResults) {
    if (featuredMovie.id === movie.id) return;
    SetFeaturedMovie(movie);
  }

  return (
    <Section title={"Vídeos"}>
      <ErrorFetchContent error={error}>
        {data && data.results.length > 0 ? (
          <div className='w-full '>
            <iframe
              title={`${featuredMovie.name}`}
              src={`https://www.youtube.com/embed/${featuredMovie.key}`}
              width='1633'
              height='919'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              className='w-full h-auto aspect-video'
            />

            <div className='w-full h-40 flex justify-center'>
              <ul
                className='mt-2 flex gap-2 overflow-x-auto overflow-y-hidden overflow-hidden'
                role='list'
              >
                {data.results.map((movie: IMovieVideoResults) => (
                  <li
                    className={`in-w-fit h-auto flex-col  cursor-pointer rounded-md ${
                      movie.id === featuredMovie.id
                        ? "border-4 border-customColors-red-500"
                        : ""
                    }`}
                    key={movie.key}
                    onClick={() => {
                      handleChangeFeaturedMovie(movie);
                    }}
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${movie.key}/hqdefault.jpg`}
                      alt={movie.name}
                      className='h-full rounded-md'
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <h1>Sem vídeos</h1>
        )}
      </ErrorFetchContent>
    </Section>
  );
}
