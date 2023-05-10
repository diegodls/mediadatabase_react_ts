import { Episode } from "../interfaces/ITvSeasonDetailed";

import backdrop_path_error from "../assets/img/image-error.png";

import { Star } from "phosphor-react";
import { API_BASEURL_IMAGE_200 } from "../utils/constants";

interface SeasonEpisodeListPropsItem {
  episode?: Episode;
}

export function SeasonEpisodeListItem({ episode }: SeasonEpisodeListPropsItem) {
  return (
    <li className='h-20 mr-3 flex rounded border border-customColors-red-500 overflow-hidden'>
      <div className='min-w-fit h-full overflow-hidden relative'>
        <img
          className='h-full absolute z-20'
          src={API_BASEURL_IMAGE_200 + episode?.still_path}
          alt={episode?.name}
          title={episode?.name}
          loading='lazy'
        />
        <img
          className='h-full relative z-10'
          src={backdrop_path_error}
          alt={`Erro ao carregar a imagem de ${episode?.name}`}
          title={`Erro ao carregar a imagem de ${episode?.name}`}
          loading='lazy'
        />
      </div>
      <div className='w-full h-full flex flex-row items-center j'>
        <div className='w-full h-full pl-2'>
          <p className='font-bold'>
            {episode?.episode_number.toString().padStart(2, "0")} -{" "}
            {episode?.name}
          </p>
          <p className='whitespace-wrap line-clamp-2'>{episode?.overview}</p>
        </div>
        <div className='h-full p-2 flex flex-col items-center justify-center bg-customColors-red-500'>
          <Star color='#FFF' weight='fill' />
          <p>{episode?.vote_average.toFixed(1)}</p>
        </div>
      </div>
    </li>
  );
}
