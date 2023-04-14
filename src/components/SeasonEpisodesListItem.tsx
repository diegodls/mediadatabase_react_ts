import { Episode } from "../interfaces/ITvSeasonDetailed";

import backdrop_path_error from "../assets/img/image-error.png";

import { API_BASEURL_IMAGE_200 } from "../utils/constants";

interface SeasonEpisodeListPropsItem {
  episode?: Episode;
}

export function SeasonEpisodeListItem({ episode }: SeasonEpisodeListPropsItem) {
  return (
    <li className='h-20 flex gap-2 overflow-hidden'>
      <div className='h-full relative'>
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
      <div>
        <p>{episode?.name}</p>
      </div>
    </li>
  );
}
