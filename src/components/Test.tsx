import { usePopularPerson } from "../hooks/usePopularPerson";
import { PopularPerson } from "./PopularPerson";

export function Test() {
  const {
    slicedPersonList,
    featuredPerson,
    dataError: popularPersonListError,
    featuredPersonDetails,
    loadingData: loadingPopularPersonList,
  } = usePopularPerson(`person/popular`);

  return (
    <PopularPerson
      personList={slicedPersonList}
      featuredPersonDetails={featuredPersonDetails}
      featuredPerson={featuredPerson}
      dataError={popularPersonListError}
      loadingData={loadingPopularPersonList}
    />
  );
}
