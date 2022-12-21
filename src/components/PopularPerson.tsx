import { IPerson } from "../interfaces/IPerson";
import { API_BASEURL_IMAGE_200 } from "../utils/constants";

import profile_picture_not_found from "../assets/img/profile_picture_not_found.png";
interface PopularPersonProps {
  personList: IPerson[] | null;
}
export function PopularPerson({ personList }: PopularPersonProps) {
  return (
    <>
      {personList && personList?.length > 0 ? (
        <div className='w-full flex flex-row justify-around items-center mt-2'>
          {personList.slice(0, 5).map((person: IPerson, _) => (
            <div
              key={person.id}
              className='h-full flex flex-col items-center justify-center p-2 rounded hover:bg-zinc-800 cursor-pointer transition-all'
            >
              <div className='w-32 h-32 rounded-full overflow-hidden'>
                {person.profile_path ? (
                  <img
                    src={`${API_BASEURL_IMAGE_200}${person.profile_path}`}
                    alt={`Foto de ${person.name}`}
                  />
                ) : (
                  <img
                    src={`${profile_picture_not_found}`}
                    alt={`Foto de ${person.name} não foi encontrada.`}
                  />
                )}
              </div>
              <strong>{person.name}</strong>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
