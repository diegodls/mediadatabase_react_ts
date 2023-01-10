import { ArrowCircleLeft, ArrowCircleRight } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { IGenres } from "../interfaces/IGenres";
import { ITrendingMoviesResult } from "../interfaces/ITrendingMovies";
import { FeaturedContent } from "./FeaturedContent";
import { Loading } from "./Loading";

let count = 0;

interface TrendingMovieProps {
  trendingMovies: ITrendingMoviesResult[] | undefined;
  movieGenresList: IGenres | undefined;
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

  return (
    <section
      ref={slideMouseOverRef}
      className={`w-full h-full flex flex-col overflow-hidden relative z-0`}
    >
      {slideArray && slideArray?.length > 0 ? (
        <>
          <div
            className={`w-full h-full flex flex-col overflow-hidden relative z-0`}
          >
            <div className='w-full top-1/2 transform -translate-y-1/2 px-3 flex items-center justify-between absolute z-50'>
              <button onClick={handlePrev}>
                <ArrowCircleLeft
                  size={32}
                  weight='bold'
                  className='bg-customColors-background/60 rounded-full drop-shadow-2xl'
                />
              </button>
              <button onClick={handleNext}>
                <ArrowCircleRight
                  size={32}
                  weight='bold'
                  className='bg-customColors-background/60 rounded-full drop-shadow-2xl'
                />
              </button>
            </div>

            <div
              ref={slideAnimationRef}
              className='w-full h-full overflow-hidden flex justify-center items-center relative select-none'
            >
              <FeaturedContent
                genresList={movieGenresList}
                contentGenresList={slideArray[currentIndex]?.genre_ids}
                contentID={slideArray[currentIndex]?.id}
                title={slideArray[currentIndex]?.title}
                subTitle={slideArray[currentIndex]?.original_title}
                release_date={slideArray[currentIndex]?.release_date}
                backdrop_path={slideArray[currentIndex]?.backdrop_path}
                overview={slideArray[currentIndex]?.overview}
                vote_average={slideArray[currentIndex]?.vote_average}
                type={slideArray[currentIndex]?.media_type}
                showReadMore={true}
              />
            </div>
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
