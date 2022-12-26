import { Star } from "phosphor-react";
import { IMovieOverview } from "../interfaces/IMovieOverview";

interface MovieOverviewBannerDescriptionProps {
  movieOverview: IMovieOverview;
}

export function MovieOverviewBannerDescription({
  movieOverview,
}: MovieOverviewBannerDescriptionProps) {
  return (
    <div className='w-full mt-2 px-4 md:max-w-[50vw] md:ml-16 md:left-0 md:top-1/2 md:transform md:-translate-y-1/2 md:absolute md:z-50 md:overflow-hidden'>
      <h1
        aria-label={`nome do filme: ${movieOverview.title}`}
        title={`Filme: ${movieOverview.title}`}
        className='md:text-4xl font-bold text-2xl'
      >
        {movieOverview.title}
      </h1>

      <p
        aria-label={`Nome original do filme: ${movieOverview.title} é ${movieOverview.original_title}`}
        title={`Nome original: ${movieOverview.original_title}`}
        className='font-bold wrap-text text-md'
      >
        {movieOverview.original_title}
      </p>

      <div className='mt-4 flex row items-center'>
        <div className='flex row'>
          <Star className='mt-[2px]' size={24} color='#c00' weight='fill' />
          <p className='text-lg ml-2 font-bold line-clamp-3'>
            {movieOverview.vote_average.toFixed(1)}
          </p>
        </div>
        <p className='text-lg ml-10 font-bold line-clamp-3'>
          {movieOverview.runtime} min
        </p>
      </div>

      {movieOverview.genres && movieOverview.genres.length > 0 ? (
        <ul
          aria-label={`Lista dos gêneros do filme:  ${movieOverview.title}`}
          className='mt-4 flex flex-wrap gap-x-2 row'
        >
          {movieOverview.genres.slice(0, 5).map((genre, _) => (
            <li
              key={genre.id}
              title={genre.name}
              aria-label={genre.name}
              className='mb-1 flex bg-black/10 rounded-md border-2 border-customColors-red-500 cursor-default'
            >
              <p className='m-auto p-1'>{genre.name}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
