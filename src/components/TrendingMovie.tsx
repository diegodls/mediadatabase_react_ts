import { ArrowCircleLeft, ArrowCircleRight, Star } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { ITrendingMoviesResult } from "../interfaces/ITrendingMovies";
import { API_BASEURL_IMAGE_1280, MovieTypeList } from "../utils/constants";
import { Loading } from "./Loading";

let count = 0;

export function TrendingMovie() {
  const { trendingMovies } = useTrendingMovies();

  let slideArray: ITrendingMoviesResult[] = trendingMovies
    ? trendingMovies
    : [];

  let slideMouseOverRef = useRef<HTMLDivElement>(null);
  let slideAnimationRef = useRef<HTMLDivElement>(null);
  let slideInterval: ReturnType<typeof setInterval>;

  const imageError =
    "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png";

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  function truncateOverview(text: string, maxLength: number) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }

  function calculateGenreFontSize(genreTitle: string): string {
    let calculatedNumber: string = "10";
    let calculatedPercentage: number = 100 - (genreTitle.length - 5) * 10;

    if (calculatedPercentage <= 30) {
      calculatedPercentage = 50;
    }

    //return `${100 - (genreTitle.length - 5) * 10}%`;
    return `text-[${calculatedPercentage}%]`;
  }

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

  useEffect(() => {
    console.log("RENDERING -> TrendingMovie.tsx");
  });

  //

  return (
    <>
      {slideArray && slideArray?.length > 0 ? (
        <div
          ref={slideMouseOverRef}
          className='w-full max-h-[28rem] overflow-hidden relative z-0'
        >
          <div className='w-60 ml-16 p-2 rounded top-1/2 transform -translate-y-1/2 absolute z-50'>
            <h1 className='md:text-4xl font-bold wrap-text line-clamp-1 text-2xl md:w-80 md:line-clamp-3'>
              {slideArray[currentIndex].title}
            </h1>
            <span className='mt-2 md:line-clamp-3 line-clamp-2'>
              {slideArray[currentIndex].overview}
            </span>

            <div className='mt-2 flex row items-center justify-between'>
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
                href='#'
                className='min-w-auto flex items-center justify-center px-2 bg-customColors-red-500 rounded'
              >
                <span className='p-1 m-auto text-white'>Leia Mais</span>
              </a>
            </div>

            <ul className='mt-2 md:flex flex-wrap gap-x-1 row hidden'>
              {MovieTypeList.genres.slice(0, 5).map((genre: any, _) => {
                return (
                  <li
                    key={genre.id}
                    className='mb-1 flex bg-black/10 rounded-md border-2 border-customColors-red-500'
                  >
                    <p className='m-auto p-1'>{genre.name}</p>
                  </li>
                );
              })}
            </ul>
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
            className='w-full max-h-[28rem] overflow-hidden flex justify-center items-center select-none'
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
        </div>
      ) : (
        <div className='w-full max-h-[28rem] flex items-center justify-center relative z-0 overflow-hidden'>
          <Loading stroke='#cfcfcf58' onTop={true} />

          <img
            className='min-w-full min-h-full flex-shrink-0 select-none relative z-10 opacity-0'
            src={imageError}
            alt={`Carregando...`}
            title={`Carregando...`}
          />
        </div>
      )}
    </>
  );
}
