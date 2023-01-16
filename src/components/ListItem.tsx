import { NavLink } from "react-router-dom";
import { API_BASEURL_IMAGE_200 } from "../utils/constants";

interface ListItemProps {
  title?: string;
  character?: string | null;
  poster_path?: string | null;
  url?: string;
}

export function ListItem({
  title,
  character = null,
  poster_path,
  url,
}: ListItemProps) {
  return (
    <li
      className='group min-w-fit h-full flex flex-col rounded-md cursor-pointer relative overflow-hidden transform transition-all scale-90 hover:scale-100 hover:drop-shadow-xl hover:z-10 select-none'
      title={title}
      aria-label={`Imagem da capa do filme ${title} - Clique para visitar`}
    >
      <NavLink to={url || ""} end className='h-full'>
        <div className='w-full h-12 flex flex-col justify-end absolute z-20 bottom-0 translate-y-12 group-hover:translate-y-0 transition-all ease-in opacity-0 group-hover:opacity-100'>
          <p className='font-bold pl-1 z-20 line-clamp-1 overflow-hidden scale-90 relative bottom-1'>
            {title}
          </p>

          {character ? (
            <p className='font-bold pl-2 z-20 line-clamp-1 overflow-hidden scale-90 relative bottom-2'>
              as {character}
            </p>
          ) : null}

          <span className='w-full h-48 bg-gradient-to-t from-black absolute z-10 bottom-[-2rem]' />
        </div>

        <img
          src={
            poster_path
              ? API_BASEURL_IMAGE_200 + poster_path
              : "https://cdn.w600.comps.canstockphoto.com.br/projetos-poster-glitched-tipogr%C3%A1fico-vetor-clip-arte_csp40896763.jpg"
          }
          className='h-full max-h-[16rem]'
        />
      </NavLink>
    </li>
  );
}
