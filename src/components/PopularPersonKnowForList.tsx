import { IPerson } from "../interfaces/IPerson";

import { API_BASEURL_IMAGE_200 } from "../utils/constants";

import profile_picture_not_found from "../assets/img/profile_picture_not_found.png";

interface PopularPersonKnowListProps {
  personList: IPerson[] | undefined;
}

export function PopularPersonKnowList({
  personList,
}: PopularPersonKnowListProps) {
  return (
    <ul className='w-full mt-2 flex flex-row flex-wrap gap-2 justify-around'>
      {personList?.slice(0, 5).map((person: IPerson) => (
        <li
          key={person.id}
          title={`Visitar o perfil de ${person.name}`}
          className='w-40 flex flex-col items-center bg-neutral-800 rounded-md transform scale-90 hover:scale-100 hover:drop-shadow-xl hover:z-10 hover:bg-zinc-800 cursor-pointer transition-all overflow-hidden'
        >
          <div className='h-full'>
            {person.profile_path ? (
              <img
                src={`${API_BASEURL_IMAGE_200}${person.profile_path}`}
                alt={`Foto de ${person.name}`}
                className='h-full'
              />
            ) : (
              <img
                src={`${profile_picture_not_found}`}
                alt={`Foto de ${person.name} não foi encontrada.`}
                className='h-full'
              />
            )}
          </div>
          <div className='py-1'>
            <p className='font-bold line-clamp-1'>{person.name}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
