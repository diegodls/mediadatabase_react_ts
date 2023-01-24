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
import { ListItem } from "./ListItem";
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
            className={`w-full h-[30vh] sm:h-[60vh] max-h-[600px] sm:min-h-[350px] flex rounded-md bg-neutral-900 relative overflow-hidden`}
          >
            <img
              src={`${API_BASEURL_IMAGE_400}${featuredPerson?.profile_path}`}
              alt={`Foto de ${featuredPerson?.name}`}
              className='h-full'
            />

            <div className='max-w-[31rem] h-full p-2 flex flex-col overflow-hidden relative'>
              <div className=''>
                <h1 className='font-bold text-xl sm:text-2xl md:text-3xl'>
                  {featuredPerson?.name}
                </h1>
                <p>{featuredPersonDetails?.birthday}</p>
              </div>

              <div className=''>
                <p className='line-clamp-1 sm:line-clamp-2'>
                  {featuredPersonDetails?.biography}
                </p>
              </div>

              <div className='w-full min-w-min hidden sm:flex sm:flex-col overflow-hidden'>
                <ul className='h-full flex items-center'>
                  {featuredPerson?.known_for
                    .slice(0, 3)
                    .map((item) =>
                      item.backdrop_path ? (
                        <ListItem
                          key={item.id}
                          url={`${item.media_type}/${item.id}`}
                          poster_path={item.poster_path}
                          title={
                            item.title ||
                            item.original_title ||
                            item.original_name ||
                            item.name
                          }
                        />
                      ) : null
                    )}
                </ul>
              </div>
              <div className='w-full grow flex items-end justify-end'>
                <NavLink
                  to={`person/${featuredPerson?.id}`}
                  className='w-fit flex items-center justify-center px-2 bg-customColors-red-500 rounded relative self-end justify-self-end'
                >
                  <p className='p-1 min-h-fit m-auto font-bold text-white'>
                    Leia Mais
                  </p>
                </NavLink>
              </div>
            </div>
          </div>

          <ul className='w-full mt-2 flex flex-row flex-wrap gap-2 justify-around'>
            {personList.slice(0, 5).map((person: IPerson, _) => (
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
        </Section>
      ) : null}
    </>
  );
}
