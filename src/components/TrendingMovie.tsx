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

  const testExample = {
    genres: [
      {
        id: 28,
        name: "Ação",
      },
      {
        id: 12,
        name: "Aventura",
      },
      {
        id: 16,
        name: "Animação",
      },
      {
        id: 35,
        name: "Comédia",
      },
      {
        id: 80,
        name: "Crime",
      },
      {
        id: 99,
        name: "Documentário",
      },
      {
        id: 18,
        name: "Drama",
      },
      {
        id: 10751,
        name: "Família",
      },
      {
        id: 14,
        name: "Fantasia",
      },
      {
        id: 36,
        name: "História",
      },
      {
        id: 27,
        name: "Terror",
      },
      {
        id: 10402,
        name: "Música",
      },
      {
        id: 9648,
        name: "Mistério",
      },
      {
        id: 10749,
        name: "Romance",
      },
      {
        id: 878,
        name: "Ficção científica",
      },
      {
        id: 10770,
        name: "Cinema TV",
      },
      {
        id: 53,
        name: "Thriller",
      },
      {
        id: 10752,
        name: "Guerra",
      },
      {
        id: 37,
        name: "Faroeste",
      },
    ],
  };

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [imageNotLoaded, setImageNotLoaded] = useState<boolean>(false);

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

  return (
    <>
      {slideArray && slideArray?.length > 0 ? (
        <div
          ref={slideMouseOverRef}
          className='w-full max-h-[28rem] relative z-0'
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
              {testExample.genres.slice(0, 5).map((genre: any, _) => {
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

          <div
            ref={slideAnimationRef}
            className='w-full max-h-[28rem] overflow-hidden flex justify-center items-center select-none bg-red-500'
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
