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
      <div className='w-full bg-blue-500'>
        <SectionTitle title='Videos' />

        {data && data.results.length > 0 ? (
          <div className='w-full bg-red-500 overflow-hidden'>
            <iframe
              title={`${featuredMovie.name}`}
              src={`https://www.youtube.com/embed/${featuredMovie.key}`}
              width='1633'
              height='919'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              className='w-full h-auto aspect-video'
            />

            <ul className='w-full h-full flex gap-2'>
              {data.results.map((movie: IMovieVideoResults) => (
                <li
                  className='w-[250px] h-[150px] bg-zinc-800 cursor-pointer'
                  key={movie.key}
                  onClick={() => {
                    handleChangeFeaturedMovie(movie);
                  }}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${movie.key}/hqdefault.jpg`}
                    alt={movie.name}
                    className='w-[250px]'
                  />
                  <p>AAAA</p>
                </li>
              ))}

              {data.results.map((movie: IMovieVideoResults) => (
                <li
                  className='w-[250px] h-[150px] bg-zinc-800 cursor-pointer'
                  key={movie.key}
                  onClick={() => {
                    handleChangeFeaturedMovie(movie);
                  }}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${movie.key}/hqdefault.jpg`}
                    alt={movie.name}
                    className='w-[250px]'
                  />
                  <p>AAAA</p>
                </li>
              ))}
              {data.results.map((movie: IMovieVideoResults) => (
                <li
                  className='w-[250px] h-[150px] bg-zinc-800 cursor-pointer'
                  key={movie.key}
                  onClick={() => {
                    handleChangeFeaturedMovie(movie);
                  }}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${movie.key}/hqdefault.jpg`}
                    alt={movie.name}
                    className='w-[250px]'
                  />
                  <p>AAAA</p>
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
