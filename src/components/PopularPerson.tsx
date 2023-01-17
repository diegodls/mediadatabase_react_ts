import { IPerson } from "../interfaces/IPerson";
import { API_BASEURL_IMAGE_200 } from "../utils/constants";

import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { Section } from "./Section";

import profile_picture_not_found from "../assets/img/profile_picture_not_found.png";
interface PopularPersonProps {
  personList: IPerson[] | undefined;
  featuredPerson: IPerson | undefined;
  dataError?: IErrorFetchContent;
  loadingData?: boolean;
}
export function PopularPerson({
  personList,
  featuredPerson,
  dataError,
  loadingData,
}: PopularPersonProps) {
  return (
    <>
      {personList && personList?.length > 0 ? (
        <Section title='Populares'>
          <div className={`w-full h-[60vh] flex bg-red-600`}>
            <img
              src={`${API_BASEURL_IMAGE_200}${featuredPerson?.profile_path}`}
              alt={`Foto de ${featuredPerson?.name}`}
              className='h-full'
            />
            <div>
              <p>{featuredPerson?.name}</p>
              <p>{featuredPerson?.known_for.length}</p>
              <p>{featuredPerson?.known_for[0].name}</p>
              <p>{featuredPerson?.known_for[0].media_type}</p>
              <p>{featuredPerson?.known_for[0].original_name}</p>
              <p>{featuredPerson?.known_for[0].original_title}</p>
            </div>
          </div>
          <ul className='w-full flex flex-row flex-wrap gap-2 justify-around'>
            {personList.slice(0, 5).map((person: IPerson, _) => (
              <li
                key={person.id}
                title={`Visitar o perfil de ${person.name}`}
                className='flex flex-col items-center  bg-neutral-800 rounded transform scale-100 hover:scale-105 hover:drop-shadow-xl hover:z-10 hover:bg-zinc-800 cursor-pointer transition-all overflow-hidden'
              >
                <div>
                  {person.profile_path ? (
                    <img
                      src={`${API_BASEURL_IMAGE_200}${person.profile_path}`}
                      alt={`Foto de ${person.name}`}
                      className='h-52'
                    />
                  ) : (
                    <img
                      src={`${profile_picture_not_found}`}
                      alt={`Foto de ${person.name} não foi encontrada.`}
                      className='h-52'
                    />
                  )}
                </div>
                <p className='font-bold line-clamp-1'>{person.name}</p>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  );
}
