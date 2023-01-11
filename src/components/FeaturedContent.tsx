import { IGenres } from "../interfaces/IGenres";
import { API_BASEURL_IMAGE_1280 } from "../utils/constants";
import { FeaturedContentDescription } from "./FeaturedContentDescription";

import { ArrowCircleLeft, ArrowCircleRight } from "phosphor-react";
import backdrop_path_error from "../assets/img/image-error.png";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";

export interface FeaturedContentProps {
  genresList?: IGenres;
  contentGenresList?: number[];
  contentID?: number;
  title?: string;
  subTitle?: string;
  release_date?: string;
  backdrop_path?: string | null;
  overview?: string;
  vote_average?: number;
  runtime?: number;
  type?: MediaTypes;
  showReadMore?: boolean;
  showInfo?: boolean;
  showArrows?: boolean;
  handlePrev?: () => void;
  handleNext?: () => void;
}

export function FeaturedContent({
  genresList,
  contentGenresList,
  contentID,
  title,
  subTitle,
  release_date,
  backdrop_path,
  overview,
  vote_average,
  runtime,
  type,
  showReadMore,
  showInfo,
  showArrows = false,
  handlePrev,
  handleNext,
}: FeaturedContentProps) {
  return (
    <section className='relative '>
      <div className='w-full max-h-[80vh] flex items-center relative overflow-hidden bg-red-500'>
        {showArrows ? (
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
        ) : null}

        <div className='w-full h-full top-0 bg-gradient-to-r from-customColors-background via-transparent absolute z-40 hidden md:block' />

        <div className='w-full h-12 bottom-0 bg-gradient-to-t from-customColors-background absolute z-40' />

        <img
          className='w-full h-auto flex-shrink-0 select-none bg-cover absolute z-20'
          src={API_BASEURL_IMAGE_1280 + backdrop_path}
          alt={title}
          title={title}
        />

        <img
          className='min-w-full min-h-full flex-shrink-0 select-none relative z-10'
          src={backdrop_path_error}
          alt={`Erro ao carregar a imagem de ${title}`}
          title={`Erro ao carregar a imagem de ${title}`}
        />
      </div>

      <FeaturedContentDescription
        genresList={genresList}
        contentGenresList={contentGenresList}
        contentID={contentID}
        title={title}
        subTitle={subTitle}
        release_date={release_date}
        overview={overview}
        vote_average={vote_average}
        type={type}
        runtime={runtime}
        showReadMore={showReadMore}
        showInfo={showInfo}
      />
    </section>
  );
}
