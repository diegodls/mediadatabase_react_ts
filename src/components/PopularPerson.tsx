import { IPerson } from "../interfaces/IPerson";
import {
  API_BASEURL_IMAGE_200,
  API_BASEURL_IMAGE_400,
} from "../utils/constants";

import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { Section } from "./Section";

import { NavLink } from "react-router-dom";
import profile_picture_not_found from "../assets/img/profile_picture_not_found.png";
import { IPersonDetails } from "../interfaces/IPersonDetails";
interface PopularPersonProps {
  personList: IPerson[] | undefined;
  featuredPerson: IPerson | undefined;
  featuredPersonDetails: IPersonDetails | undefined;
  dataError?: IErrorFetchContent;
  loadingData?: boolean;
}
export function PopularPerson({
  personList,
  featuredPerson,
  featuredPersonDetails,
  dataError,
  loadingData,
}: PopularPersonProps) {
  return (
    <>
      {personList && personList?.length > 0 ? (
        <Section title='Populares'>
          <div
            className={`w-full h-[40vh] md:h-[60vh] max-h-[600px] flex rounded-md bg-neutral-900 overflow-hidden`}
          >
            <img
              src={`${API_BASEURL_IMAGE_400}${featuredPerson?.profile_path}`}
              alt={`Foto de ${featuredPerson?.name}`}
              className='h-full'
            />
            <div className='w-full p-2'>
              <div className='w-full h-full flex flex-col justify-evenly'>
                <div>
                  <h1 className='min-h-fit font-bold text-xl sm:text-2xl md:text-3xl'>
                    {featuredPerson?.name}
                  </h1>
                  <p className='min-h-fit'>{featuredPersonDetails?.birthday}</p>
                </div>

                <p className='line-clamp-1 sm:line-clamp-2 md:line-clamp-3 min-h-fit'>
                  {featuredPersonDetails?.biography}
                </p>

                <NavLink
                  to={`person/${featuredPerson?.id}`}
                  className='w-fit flex items-center justify-center px-2 bg-customColors-red-500 rounded self-end'
                >
                  <p className='p-1 min-h-fit m-auto text-white'>Leia Mais</p>
                </NavLink>
                <div className='hidden md:flex md:flex-col'>
                  <h2 className='min-h-fit font-bold text-md sm:text-lg md:text-xl'>
                    Atuou em:
                  </h2>
                  <ul className='w-full flex gap-2'>
                    {featuredPerson?.known_for.slice(0, 3).map((item) => (
                      <li key={item.id} className='rounded-sm'>
                        <p className='line-clamp-1'>
                          {item.title || item.original_title}
                        </p>

                        {item.backdrop_path ? (
                          <img
                            src={`${API_BASEURL_IMAGE_400}${item.backdrop_path}`}
                            alt={`Foto de ${featuredPerson?.name}`}
                          />
                        ) : (
                          <img
                            src={`${profile_picture_not_found}`}
                            alt={`Foto de ${item.name} não foi encontrada.`}
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <ul className='w-full mt-2 flex flex-row flex-wrap gap-2 justify-around'>
            {personList.slice(0, 5).map((person: IPerson, _) => (
              <li
                key={person.id}
                title={`Visitar o perfil de ${person.name}`}
                className='flex flex-col items-center bg-neutral-800 rounded-md transform scale-90 hover:scale-100 hover:drop-shadow-xl hover:z-10 hover:bg-zinc-800 cursor-pointer transition-all overflow-hidden'
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
                <p className='font-bold line-clamp-1'>{person.name}</p>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  );
}
