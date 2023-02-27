import { PopularPersonDescription } from "./PopularPersonDescription";
import { PopularPersonList } from "./PopularPersonList";
import { Section } from "./Section";

import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { IPerson } from "../interfaces/IPerson";
import { IPersonDetails } from "../interfaces/IPersonDetails";

import { API_BASEURL_IMAGE_400 } from "../utils/constants";

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
            className={`w-full h-[40vh] sm:h-[60vh] max-h-[600px] sm:min-h-[350px] flex rounded-md bg-neutral-900 transition-all overflow-hidden`}
          >
            <img
              src={`${API_BASEURL_IMAGE_400}${featuredPerson?.profile_path}`}
              alt={`Foto de ${featuredPerson?.name}`}
              className='h-full'
            />

            <PopularPersonDescription
              featuredPerson={featuredPerson}
              featuredPersonDetails={featuredPersonDetails}
            />
          </div>

          <PopularPersonList personList={personList} />
        </Section>
      ) : null}
    </>
  );
}
