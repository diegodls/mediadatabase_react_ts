import { ArrowCircleLeft, ArrowCircleRight } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { ITrendingResult } from "../interfaces/ITrending";
import { API_URL_IMAGE_500 } from "../utils/constants";

let count = 0;

export function TrendingMovie() {
  const { trendingMovies } = useTrendingMovies();

  let slideArray: ITrendingResult[] = trendingMovies ? trendingMovies : [];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  let slideRef = useRef<HTMLDivElement>(null);
  let slideInterval: ReturnType<typeof setInterval>;

  function handleNext() {
    if (slideArray.length > 0) {
      count = (count + 1) % slideArray.length;
      setCurrentIndex(count);
      slideRef.current?.classList.add("animate-fadeIn");
    }
  }

  function handlePrev() {
    if (slideArray.length > 0) {
      count = (currentIndex + slideArray.length - 1) % slideArray.length;
      setCurrentIndex(count);
      slideRef.current?.classList.add("animate-fadeIn");
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
    slideRef.current?.classList.remove("animate-fadeIn");
  }

  function pauseInterval() {
    clearInterval(slideInterval);
  }

  useEffect(() => {
    slideRef.current?.addEventListener("animationend", removeAnimation);
    slideRef.current?.addEventListener("mouseleave", startSlide);
    slideRef.current?.addEventListener("mouseenter", pauseInterval);
    startSlide();

    return () => {
      pauseInterval();
    };
  }, [slideArray]);

  return (
    <div>
      {slideArray && slideArray?.length > 0 ? (
        <>
          <div ref={slideRef} className='relative z-0'>
            <div className='aspect-video'>
              <img
                src={API_URL_IMAGE_500 + slideArray[currentIndex].backdrop_path}
                alt=''
              />
            </div>
            <div className='absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex items-center justify-between'>
              <button onClick={handlePrev}>
                <ArrowCircleLeft size={32} weight='bold' />
              </button>
              <button onClick={handleNext}>
                <ArrowCircleRight size={32} weight='bold' />
              </button>
            </div>
            <p>
              {slideArray.length} - {count}
            </p>
          </div>
        </>
      ) : (
        "Carregando..."
      )}
    </div>
  );
}
