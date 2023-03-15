import { useEffect, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { IMovieVideoResults, IMovieVideos } from "../interfaces/IMovieVideos";
import { ErrorFetchContent } from "./ErrorFetchContent";
import { ScrollableComponent } from "./ScrollableComponent";
import { Section } from "./Section";

interface MovieVideoProps {
  data?: IMovieVideos;
  error?: IErrorFetchContent;
  mediaName: string;
}

export function MovieVideos({ data, error, mediaName }: MovieVideoProps) {
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
              className='w-full max-w-CustomMaxWidth h-auto aspect-video'
            />
            {data.results && data.results.length > 1 ? (
              <div className='w-full h-list-md flex items-center mt-2'>
                <ScrollableComponent listSize={data.results.length}>
                  <ul className='h-full flex flex-row items-center' role='list'>
                    {data.results.map((movie: IMovieVideoResults) => (
                      <li className='h-full min-w-fit' key={movie.key}>
                        <button
                          className={`h-full rounded-md border-4 cursor-pointer overflow-hidden scale-95 hover:scale-100 hover:drop-shadow-lg focus-visible:scale-100 focus:scale-100 focus-visible:drop-shadow-xl focus-visible:outline-none focus-visible:ring-0 focus-visible:border-4 focus-visible:border-customColors-red-500 transition-all ${
                            movie.id === featuredMovie.id
                              ? "border-customColors-red-500"
                              : "border-transparent"
                          }`}
                          key={movie.key}
                          aria-label={`Assistir ${movie.name} de ${mediaName}`}
                          title={`Assistir ${movie.name} de ${mediaName}`}
                          onClick={() => {
                            handleChangeFeaturedMovie(movie);
                          }}
                        >
                          <img
                            src={`https://i.ytimg.com/vi/${movie.key}/hqdefault.jpg`}
                            alt={movie.name}
                            className='h-full'
                            loading='lazy'
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                </ScrollableComponent>
              </div>
            ) : null}
          </div>
        ) : (
          <h1>Sem vídeos</h1>
        )}
      </ErrorFetchContent>
    </Section>
  );
}
