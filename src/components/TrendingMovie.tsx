import { ArrowCircleLeft, ArrowCircleRight, Star } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { ITrendingResult } from "../interfaces/ITrending";
import { API_BASEURL_IMAGE_1280 } from "../utils/constants";
import { Loading } from "./Loading";

let count = 0;

export function TrendingMovie() {
  const { trendingMovies } = useTrendingMovies();

  let slideArray: ITrendingResult[] = trendingMovies ? trendingMovies : [];

  let slideMouseOverRef = useRef<HTMLDivElement>(null);
  let slideAnimationRef = useRef<HTMLDivElement>(null);
  let slideInterval: ReturnType<typeof setInterval>;

  const imageError =
    "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png";

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [imageNotLoaded, setImageNotLoaded] = useState<boolean>(false);

  function truncateOverview(text: string, maxLength: number) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
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

  return (
    <>
      {slideArray && slideArray?.length > 0 ? (
        <div
          ref={slideMouseOverRef}
          className='w-full max-h-[28rem] relative z-0'
        >
          <div className='ml-16 p-2 rounded w-80 top-1/2 transform -translate-y-1/2 absolute z-50'>
            <h1 className='text-4xl font-bold wrap-text'>
              {slideArray[currentIndex].title}
            </h1>
            <span className='line-clamp-3'>
              {slideArray[currentIndex].overview}
            </span>
            <div className='mt-2 flex row items-center'>
              <Star size={20} color='#c00' weight='fill' />
              <span className='ml-2 mt-[2px] font-bold line-clamp-3'>
                {slideArray[currentIndex].vote_average.toFixed(1)}
              </span>
              <span className='w-16 h-8 flex items-center justify-center ml-2 mt-[2px] font-bold px-[2px] py-[1px] bg-black/10 rounded border-2 overflow-x-hidden border-customColors-red-500'>
                Animação
              </span>
              <span
                title='Animação'
                className='h-8 flex items-center justify-center ml-2 mt-[2px] font-bold px-2 py-[1px] bg-black/10 rounded border-2 border-customColors-red-500 break-words'
              >
                Animação
              </span>
              <a
                href='#'
                className='h-8 flex items-center justify-center ml-2 mt-[2px] font-bold px-2 py-[1px] bg-black/10 rounded border-2 border-customColors-red-500'
              >
                Mais ...
              </a>
            </div>
          </div>

          <div
            ref={slideAnimationRef}
            className='w-full max-h-[28rem]  overflow-hidden flex justify-center items-center select-none bg-red-500'
          >
            <img
              className='min-w-full min-h-full flex-shrink-0 select-none bg-green-500'
              src={
                imageNotLoaded
                  ? imageError
                  : API_BASEURL_IMAGE_1280 +
                    slideArray[currentIndex].backdrop_path
              }
              alt={slideArray[currentIndex].title}
              title={slideArray[currentIndex].title}
              onError={() => setImageNotLoaded(true)}
            />
          </div>

          <div className='w-full h-12 top-0 bg-gradient-to-b from-customColors-background absolute z-50' />

          <div className='w-full h-full top-0 bg-gradient-to-r from-customColors-background via-transparent absolute z-10' />

          <div className='w-full h-12 bottom-0 bg-gradient-to-t from-customColors-background absolute z-50' />

          <div className='w-full top-1/2 transform -translate-y-1/2 px-3 flex items-center justify-between absolute z-50'>
            <button onClick={handlePrev}>
              <ArrowCircleLeft size={32} weight='bold' />
            </button>
            <button onClick={handleNext}>
              <ArrowCircleRight size={32} weight='bold' />
            </button>
          </div>
        </div>
      ) : (
        <div
          ref={slideMouseOverRef}
          className='w-full min-h-[28rem] max-h-[28rem] flex items-center justify-center relative z-0'
        >
          <Loading stroke='#cfcfcf58' />
        </div>
      )}
    </>
  );
}
