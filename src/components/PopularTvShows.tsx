import { Star } from "phosphor-react";
import { IGenres } from "../interfaces/IGenres";
import { IPopularTvShowsResults } from "../interfaces/IPopularTvShows";
import { API_BASEURL_IMAGE_1280 } from "../utils/constants";

interface PopularTvShowProps {
  featuredPopularTvShow: IPopularTvShowsResults | null;
  TvShowsGenresList: IGenres | null;
}

export function PopularTvShow({
  featuredPopularTvShow,
  TvShowsGenresList,
}: PopularTvShowProps) {
  return featuredPopularTvShow ? (
    <div className='w-full max-h-[80vh] relative overflow-hidden'>
      <div className='md:w-80 w-60 ml-16 rounded top-1/2 transform -translate-y-1/2 absolute z-50 overflow-hidden'>
        <h1
          aria-label={`Seriado: ${featuredPopularTvShow.name}`}
          title={`Seriado: ${featuredPopularTvShow.name}`}
          className='md:text-4xl font-bold wrap-text text-2xl'
        >
          {featuredPopularTvShow.name}
        </h1>
        <span
          aria-label={`Resumo do filme: ${featuredPopularTvShow.name}: ${featuredPopularTvShow.overview}`}
          title={featuredPopularTvShow.overview}
          className='mt-2 md:line-clamp-3 line-clamp-2'
        >
          {featuredPopularTvShow.overview}
        </span>

        <div className='mt-3 flex row items-center justify-between'>
          <span className='flex row'>
            <Star className='mt-[2px]' size={24} color='#c00' weight='fill' />
            <span className='text-lg ml-2 font-bold line-clamp-3'>
              {featuredPopularTvShow.vote_average.toFixed(1)}
            </span>
          </span>

          <a
            aria-label={`Botão: Clique para saber mais sobre ${featuredPopularTvShow.name}`}
            href='#'
            className='min-w-auto flex items-center justify-center px-2 bg-customColors-red-500 rounded'
          >
            <span className='p-1 m-auto text-white'>Leia Mais</span>
          </a>
        </div>

        {TvShowsGenresList && TvShowsGenresList.genres.length > 0 ? (
          <ul
            aria-label={`Lista dos gêneros do filme: ${featuredPopularTvShow.name}`}
            className='mt-3 md:flex flex-wrap gap-x-2 row hidden'
          >
            {TvShowsGenresList.genres.map((genre, id: number) => {
              return featuredPopularTvShow.genre_ids
                .slice(0, 5)
                .includes(genre.id) ? (
                <li
                  key={id}
                  title={genre.name}
                  aria-label={genre.name}
                  className='mb-1 flex bg-black/20 rounded-md border-2 border-customColors-red-500 cursor-default'
                >
                  <p className='m-auto p-1'>{genre.name}</p>
                </li>
              ) : null;
            })}
          </ul>
        ) : null}
      </div>

      <div className='w-full h-full top-0 bg-gradient-to-r from-customColors-background via-transparent absolute z-40' />
      <img
        className='w-full h-auto flex-shrink-0 select-none bg-cover'
        src={API_BASEURL_IMAGE_1280 + featuredPopularTvShow?.backdrop_path}
        alt={featuredPopularTvShow?.name}
        title={featuredPopularTvShow?.name}
      />
    </div>
  ) : null;
}
