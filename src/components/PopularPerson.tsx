import { PopularPersonDescription } from "./PopularPersonDescription";
import { PopularPersonList } from "./PopularPersonList";
import { Section } from "./Section";

import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { IPerson } from "../interfaces/IPerson";
import { IPersonDetails } from "../interfaces/IPersonDetails";

import { API_BASEURL_IMAGE_400 } from "../utils/constants";
import { ErrorFetchContent } from "./ErrorFetchContent";
import { Loading } from "./Loading";

interface PopularPersonProps {
  personList?: IPerson[];
  featuredPerson?: IPerson;
  featuredPersonDetails?: IPersonDetails;
  dataError?: IErrorFetchContent;
  loadingData?: boolean;
  loadingPersonDetails?: boolean;
}
export function PopularPerson({
  personList,
  featuredPerson,
  featuredPersonDetails,
  dataError,
  loadingData,
  loadingPersonDetails,
}: PopularPersonProps) {
  return (
    <Section title='Populares'>
      <ErrorFetchContent error={dataError}>
        {personList &&
        personList.length > 0 &&
        featuredPerson &&
        featuredPerson.known_for.length > 0 &&
        featuredPersonDetails &&
        !loadingPersonDetails ? (
          <div className='w-full bg-yellow-700'>
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

            <PopularPersonList
              personList={personList}
              loadingPersonDetails={loadingData}
            />
          </div>
        ) : (
          <Loading onTop={false} />
        )}
      </ErrorFetchContent>
    </Section>
  );
}
