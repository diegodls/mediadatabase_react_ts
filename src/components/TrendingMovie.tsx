import { ArrowCircleLeft, ArrowCircleRight, Star } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { IGenres } from "../interfaces/IGenres";
import { ITrendingMoviesResult } from "../interfaces/ITrendingMovies";
import { API_BASEURL_IMAGE_1280 } from "../utils/constants";
import { Loading } from "./Loading";

let count = 0;

interface TrendingMovieProps {
  trendingMovies: ITrendingMoviesResult[] | null;
  movieGenresList: IGenres | null;
}

export function TrendingMovie({
  trendingMovies,
  movieGenresList,
}: TrendingMovieProps) {
  let slideArray: ITrendingMoviesResult[] = trendingMovies
    ? trendingMovies
    : [];

  let slideMouseOverRef = useRef<HTMLDivElement>(null);
  let slideAnimationRef = useRef<HTMLDivElement>(null);
  let slideInterval: ReturnType<typeof setInterval>;

  const imageError =
    "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png";

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  function handleNext() {
    if (slideArray.length > 0) {
      count = (count + 1) % slideArray.length;
      setCurrentIndex(count);
      slideAnimationRef.current?.classList.add("animate-fadeIn");
    }
  }

  function handlePrev() {
    if (slideArray.length > 0) {
      count = (currentIndex + slideArray.length - 1) % slideArray.length;
      setCurrentIndex(count);
      slideAnimationRef.current?.classList.add("animate-fadeIn");
    }
  }

  function startSlide() {
    slideInterval = setInterval(() => {
      if (slideArray.length > 0) {
        handleNext();
      }
    }, 3000);
  }

  function removeAnimation() {
    slideAnimationRef.current?.classList.remove("animate-fadeIn");
  }

  function pauseInterval() {
    clearInterval(slideInterval);
  }

  useEffect(() => {
    slideAnimationRef.current?.addEventListener(
      "animationend",
      removeAnimation
    );
    slideMouseOverRef.current?.addEventListener("mouseleave", startSlide);
    slideMouseOverRef.current?.addEventListener("mouseenter", pauseInterval);
    startSlide();

    return () => {
      pauseInterval();
    };
  }, [slideArray]);

  //slideArray && slideArray?.length > 0

  return (
    <section
      ref={slideMouseOverRef}
      className={`w-full h-full max-h-[30rem] overflow-hidden relative z-0`}
    >
      {slideArray && slideArray?.length > 0 ? (
        <>
          <div className='md:w-80 w-60 ml-16 rounded top-1/2 transform -translate-y-1/2 absolute z-50 overflow-hidden'>
            <h1
              aria-label={`Filme: ${slideArray[currentIndex].title}`}
              title={`Filme: ${slideArray[currentIndex].title}`}
              className='md:text-4xl font-bold wrap-text line-clamp-1 text-2xl md:w-80 md:line-clamp-1'
            >
              {slideArray[currentIndex].title}
            </h1>
            <span
              aria-label={`Resumo do filme: ${slideArray[currentIndex].title}: ${slideArray[currentIndex].overview}`}
              title={slideArray[currentIndex].overview}
              className='mt-2 md:line-clamp-3 line-clamp-2'
            >
              {slideArray[currentIndex].overview}
            </span>
            <div className='mt-3 flex row items-center justify-between'>
              <span className='flex row'>
                <Star
                  className='mt-[2px]'
                  size={24}
                  color='#c00'
                  weight='fill'
                />
                <span className='text-lg ml-2 font-bold line-clamp-3'>
                  {slideArray[currentIndex].vote_average.toFixed(1)}
                </span>
              </span>

              <a
                aria-label={`Botão para saber mais sobre ${slideArray[currentIndex].title}`}
                href='#'
                className='min-w-auto flex items-center justify-center px-2 bg-customColors-red-500 rounded'
              >
                <span className='p-1 m-auto text-white'>Leia Mais</span>
              </a>
            </div>

            {movieGenresList && movieGenresList.genres.length > 0 ? (
              <ul
                aria-label={`Lista dos gêneros do filme:  ${slideArray[currentIndex].title}`}
                className='mt-3 md:flex flex-wrap gap-x-2 row hidden'
              >
                {movieGenresList.genres.map((genre, id: number) => {
                  return slideArray[currentIndex].genre_ids
                    .slice(0, 5)
                    .includes(genre.id) ? (
                    <li
                      key={id}
                      title={genre.name}
                      aria-label={genre.name}
                      className='mb-1 flex bg-black/10 rounded-md border-2 border-customColors-red-500 cursor-default'
                    >
                      <p className='m-auto p-1'>{genre.name}</p>
                    </li>
                  ) : null;
                })}
              </ul>
            ) : null}
          </div>

          <div className='w-full h-12 top-0 bg-gradient-to-b from-customColors-background absolute z-50' />

          <div className='w-full h-full top-0 bg-gradient-to-r from-customColors-background via-transparent absolute z-40' />

          <div className='w-full h-12 bottom-0 bg-gradient-to-t from-customColors-background absolute z-50' />

          <div className='w-full top-1/2 transform -translate-y-1/2 px-3 flex items-center justify-between absolute z-50'>
            <button onClick={handlePrev}>
              <ArrowCircleLeft size={32} weight='bold' />
            </button>
            <button onClick={handleNext}>
              <ArrowCircleRight size={32} weight='bold' />
            </button>
          </div>

          <div
            ref={slideAnimationRef}
            className='w-full h-full overflow-hidden flex justify-center items-center select-none'
          >
            <img
              className='min-w-full min-h-full flex-shrink-0 select-none absolute z-20'
              src={
                API_BASEURL_IMAGE_1280 + slideArray[currentIndex].backdrop_path
              }
              alt={slideArray[currentIndex].title}
              title={slideArray[currentIndex].title}
            />

            <img
              className='min-w-full min-h-full flex-shrink-0 select-none relative z-10'
              src={imageError}
              alt={`Erro ao carregar a imagem de ${slideArray[currentIndex].title}`}
              title={`Erro ao carregar a imagem de ${slideArray[currentIndex].title}`}
            />
          </div>
        </>
      ) : (
        <div
          className={`w-full max-h-[30rem] flex items-center justify-center overflow-hidden`}
        >
          <Loading stroke='#cfcfcf58' onTop={true} />

          <div
            className={`w-full min-h-[350px] flex items-center justify-center opacity-0 overflow-hidden `}
          >
            <img
              className='min-w-full min-h-full flex-shrink-0 select-none relative z-10 opacity-0'
              src={imageError}
              alt={`Carregando...`}
              title={`Carregando...`}
            />
          </div>
        </div>
      )}
    </section>
  );
}
