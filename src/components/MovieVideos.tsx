import { useEffect, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { IMovieVideoResults, IMovieVideos } from "../interfaces/IMovieVideos";
import { ErrorFetchContent } from "./ErrorFetchContent";
import { ScrollableComponent } from "./ScrollableComponent";
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
          <div className='w-full'>
            <iframe
              title={`${featuredMovie.name}`}
              src={`https://www.youtube.com/embed/${featuredMovie.key}`}
              width='1633'
              height='919'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              className='w-full h-auto aspect-video'
            />

            <div className='w-full max-h-list-sm flex items-center mt-2 bg-red-400'>
              <ScrollableComponent listSize={data.results.length}>
                <ul
                  className='h-full flex flex-row items-center bg-sky-400'
                  role='list'
                >
                  {data.results.map((movie: IMovieVideoResults) => (
                    <li
                      className={`min-w-fit h-full flex flex-col rounded-md box-border cursor-pointer overflow-hidden scale-95 hover:scale-100 transition-all ${
                        movie.id === featuredMovie.id
                          ? "bg-black border-4 border-customColors-red-500"
                          : " border-4 border-transparent"
                      }`}
                      key={movie.key}
                      onClick={() => {
                        handleChangeFeaturedMovie(movie);
                      }}
                    >
                      <img
                        src={`https://i.ytimg.com/vi/${movie.key}/hqdefault.jpg`}
                        alt={movie.name}
                        className='max-h-list-sm rounded-md object-cover'
                        loading='lazy'
                      />
                    </li>
                  ))}
                </ul>
              </ScrollableComponent>
            </div>
          </div>
        ) : (
          <h1>Sem vídeos</h1>
        )}
      </ErrorFetchContent>
    </Section>
  );
}
