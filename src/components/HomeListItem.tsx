import { API_BASEURL_IMAGE_200 } from "../utils/constants";

interface HomeListItemProps {
  title?: string;
  poster_path: string;
}

export function HomeListItem({ title, poster_path }: HomeListItemProps) {
  return (
    <li
      className='group min-w-fit h-full flex flex-col rounded-md cursor-pointer relative overflow-hidden transform transition-all scale-90 hover:scale-100 hover:drop-shadow-xl hover:z-10 select-none'
      title={title}
      aria-label={`Imagem da capa do filme ${title} - Clique para visitar`}
    >
      <div className='w-full h-12 flex items-center absolute z-20 bottom-0 translate-y-12 group-hover:translate-y-0 transition-all ease-in opacity-0 group-hover:opacity-100'>
        <p className='font-bold pl-2 absolute z-20 line-clamp-1 overflow-hidden scale-90'>
          {title}
        </p>

        <span className='w-full h-12 bg-gradient-to-t from-black absolute z-10' />
      </div>

      <img
        src={poster_path ? API_BASEURL_IMAGE_200 + poster_path : poster_path}
        className='h-full'
      />
    </li>
  );
}
