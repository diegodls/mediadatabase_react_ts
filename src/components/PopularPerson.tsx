import { IPerson } from "../interfaces/IPerson";
import { API_BASEURL_IMAGE_200 } from "../utils/constants";

interface PopularPersonProps {
  personList: IPerson[] | null;
}
export function PopularPerson({ personList }: PopularPersonProps) {
  return (
    <>
      {personList && personList?.length > 0 ? (
        <div className='w-full flex flex-row justify-around items-center bg-red-500'>
          {personList.slice(0, 5).map((person: IPerson, _) => (
            <div className='h-full flex flex-col items-center justify-center'>
              <div
                key={person.id}
                className='w-32 h-32 rounded-full overflow-hidden bg-green-500'
              >
                <img
                  src={`${API_BASEURL_IMAGE_200}${person.profile_path}`}
                  alt={`Foto de ${person.name}`}
                />
              </div>
              <p>{person.name}</p>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
