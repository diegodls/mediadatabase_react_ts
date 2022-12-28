import { NavLink } from "react-router-dom";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";
import { API_BASEURL_IMAGE_200 } from "../utils/constants";

interface HomeListItemProps {
  title?: string;
  character?: string | null;
  poster_path?: string | null;
  type?: MediaTypes;
  contentID?: number;
}

export function HomeListItem({
  title,
  character = null,
  poster_path,
  type,
  contentID,
}: HomeListItemProps) {
  const urlType: MediaTypes = type === "movie" ? "movie" : "tvshow";

  return (
    <li
      className='group min-w-fit h-full flex flex-col rounded-md cursor-pointer relative overflow-hidden transform transition-all scale-90 hover:scale-100 hover:drop-shadow-xl hover:z-10 select-none'
      title={title}
      aria-label={`Imagem da capa do filme ${title} - Clique para visitar`}
    >
      <NavLink to={`${urlType}/${contentID}`} className='h-full'>
        <div className='w-full h-12 flex flex-col justify-center absolute z-20 bottom-0 translate-y-12 group-hover:translate-y-0 transition-all ease-in opacity-0 group-hover:opacity-100'>
          <p className='font-bold pl-2 z-20 line-clamp-1 overflow-hidden scale-90'>
            {title}
          </p>

          {character ? (
            <p className='font-bold pl-2 z-20 line-clamp-1 overflow-hidden scale-90'>
              as {character}
            </p>
          ) : null}

          <span className='w-full h-12 bg-gradient-to-t from-black absolute z-10' />
        </div>

        <img
          src={
            poster_path
              ? API_BASEURL_IMAGE_200 + poster_path
              : "https://cdn.w600.comps.canstockphoto.com.br/projetos-poster-glitched-tipogr%C3%A1fico-vetor-clip-arte_csp40896763.jpg"
          }
          className='h-full'
        />
      </NavLink>
    </li>
  );
}
