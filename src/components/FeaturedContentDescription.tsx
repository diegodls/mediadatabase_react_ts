import { Star } from "phosphor-react";
import { NavLink } from "react-router-dom";
import { FeaturedContentProps } from "./FeaturedContent";

export function FeaturedContentDescription({
  genresList,
  contentGenresList,
  contentID,
  title,
  subTitle,
  release_date,
  overview,
  vote_average,
  runtime,
  type,
  showReadMore,
  showInfo = true,
}: FeaturedContentProps) {
  const mediaType: string = type === "movie" ? "Filme" : "Seriado";
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  function formatDate(date: string): string {
    let day = date.split("-")[2];
    let month = date.split("-")[1];
    let year = date.split("-")[0];
    let monthInText = months[Number(month) - 1];
    return `${day} de ${monthInText} de ${year}`;
  }

  return (
    <div className='mt-2 px-4 md:max-w-[40%] md:px-0 md:mt-0 md:ml-16 md:left-0 md:top-1/2 md:transform md:-translate-y-1/2 md:absolute md:z-50 md:overflow-hidden'>
      {title ? (
        <h1
          aria-label={`${mediaType}: ${title}`}
          title={`${mediaType}: ${title}`}
          className='md:text-4xl font-bold wrap-text text-2xl'
        >
          {title}
        </h1>
      ) : null}

      {subTitle ? (
        <p
          aria-label={`Nome original do ${mediaType}: ${title} é ${subTitle}`}
          title={`Nome original do ${mediaType}: ${title} é ${subTitle}`}
          className='font-bold wrap-text text-md'
        >
          {subTitle}
        </p>
      ) : null}

      {overview && showInfo ? (
        <span
          aria-label={`Resumo do ${mediaType}: ${title}: ${overview}`}
          title={overview}
          className='mt-2 md:line-clamp-3 line-clamp-2'
        >
          {overview}
        </span>
      ) : null}

      <div className='w-full mt-2 flex items-center justify-between'>
        {release_date ? (
          <span
            aria-label={`O ${mediaType} ${title} foi lançado em ${formatDate(
              release_date
            )}`}
            title={`O ${mediaType} ${title} foi lançado em ${formatDate(
              release_date
            )}`}
            className='text-lg font-bold line-clamp-3'
          >
            {release_date.split("-")[0]}
          </span>
        ) : null}

        {runtime ? (
          <p
            aria-label={`O ${mediaType} ${title} tem a duração de ${runtime} minutos`}
            title={`O ${mediaType} ${title} tem a duração de ${runtime} minutos`}
            className='text-lg font-bold line-clamp-3'
          >
            {runtime} min
          </p>
        ) : null}

        {vote_average ? (
          <span
            aria-label={`O ${mediaType} ${title} tem uam popularidade de ${vote_average}`}
            title={`O ${mediaType} ${title} tem uam popularidade de ${vote_average}s`}
            className='flex'
          >
            <Star
              size={24}
              weight='fill'
              className='text-customColors-red-500'
            />
            <span className='ml-2 text-lg font-bold line-clamp-3'>
              {vote_average?.toFixed(1)}
            </span>
          </span>
        ) : null}

        {showReadMore && contentID ? (
          <NavLink
            to={`${type}/${contentID}`}
            className='min-w-auto flex items-center justify-center px-2 bg-customColors-red-500 rounded'
          >
            <p className='p-1 m-auto text-white'>Leia Mais</p>
          </NavLink>
        ) : null}
      </div>

      {genresList && genresList.genres.length > 0 ? (
        <ul
          aria-label={`Lista dos gêneros do ${mediaType}: ${title}`}
          className='mt-3 flex flex-wrap gap-x-2 row '
        >
          {genresList.genres.map((genre) => {
            return contentGenresList?.slice(0, 5).includes(genre.id) ? (
              <li
                key={genre.id}
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
  );
}
