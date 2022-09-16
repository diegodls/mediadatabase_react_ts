import { ArrowCircleLeft, ArrowCircleRight } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { ITrendingResult } from "../interfaces/ITrending";
import { API_BASEURL_IMAGE_1280 } from "../utils/constants";

let count = 0;

export function TrendingMovie() {
  const { trendingMovies } = useTrendingMovies();

  let slideArray: ITrendingResult[] = trendingMovies ? trendingMovies : [];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  let slideMouseOverRef = useRef<HTMLDivElement>(null);
  let slideAnimationRef = useRef<HTMLDivElement>(null);
  let slideInterval: ReturnType<typeof setInterval>;

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

  return (
    <>
      {slideArray && slideArray?.length > 0 ? (
        <div
          ref={slideMouseOverRef}
          className='w-full max-h-[28rem]  relative z-0'
        >
          <div
            ref={slideAnimationRef}
            className='w-full max-h-[28rem] overflow-hidden flex justify-center items-center'
          >
            <img
              className='min-w-full min-h-full flex-shrink-0'
              src={
                API_BASEURL_IMAGE_1280 + slideArray[currentIndex].backdrop_path
              }
              alt={slideArray[currentIndex].title}
              title={slideArray[currentIndex].title}
            />
          </div>
          <div className='ml-16 p-2 rounded w-80 top-1/2 transform -translate-y-1/2 absolute'>
            <strong className='text-4xl wrap-text'>
              {slideArray[currentIndex].title}
            </strong>
          </div>
          <div className='w-full top-0 h-10 bg-gradient-to-b from-bg-custom-background absolute z-10' />
          <div className='w-full bottom-0 h-12 bg-gradient-to-t from-bg-custom-background absolute z-10' />
          <div className='absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex items-center justify-between'>
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
          className='w-full h-[28rem] relative z-0'
        />
      )}
    </>
  );
}
