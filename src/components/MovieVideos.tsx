import { useEffect, useState } from "react";
import { IMovieVideoResults, IMovieVideos } from "../interfaces/IMovieVideos";
import { Section } from "./IUSharedComponents/Section";
import { SectionTitle } from "./IUSharedComponents/SectionTitle";

interface MovieVideoProps {
  data?: IMovieVideos;
}

export function MovieVideos({ data }: MovieVideoProps) {
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
    <Section>
      <div className='w-full'>
        <SectionTitle title='Videos' />

        {data && data.results.length > 0 ? (
          <div className='w-full overflow-hidden flex bg-red-500'>
            <div className='max-w-screen-lg flex-1'>
              <iframe
                title={`${featuredMovie.name}`}
                src={`https://www.youtube.com/embed/${featuredMovie.key}`}
                width='1633'
                height='919'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                className='w-full h-auto aspect-video'
              />
            </div>
            <ul className='w-[20%] flex flex-col gap-2 overflow-x-hidden'>
              {data.results.map((movie: IMovieVideoResults) => (
                <li
                  className='w-full bg-zinc-800 cursor-pointer'
                  key={movie.key}
                  onClick={() => {
                    handleChangeFeaturedMovie(movie);
                  }}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${movie.key}/hqdefault.jpg`}
                    alt={movie.name}
                  />
                  <p>{movie.name}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <h1>Sem vídeos</h1>
        )}
      </div>
    </Section>
  );
}
