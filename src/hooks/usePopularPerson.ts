import { useEffect, useState } from "react";
import { IPerson, IPersonApiReturn } from "../interfaces/IPerson";
import { IPersonDetails } from "../interfaces/IPersonDetails";
import { removeItemFromArray } from "../utils/removeItemFromArray";
import { useFetchData } from "./useFetchData";

export function usePopularPerson(url: string) {
  const {
    data: popularPersonList,
    dataError,
    loadingData,
  } = useFetchData<IPersonApiReturn>(`${url}`);

  const [slicedPersonList, setSlicedPersonList] = useState<IPerson[]>();
  const [featuredPerson, setFeaturedPerson] = useState<IPerson>();

  const {
    data: featuredPersonDetails,
    dataError: featuredPersonDetailsError,
    fetchData: fetchFeaturedPersonDetailsData,
    loadingData: loadingPersonDetails,
  } = useFetchData<IPersonDetails>(`person/${featuredPerson?.id}`);

  function sliceList() {
    if (!popularPersonList || popularPersonList.results.length <= 0) {
      return;
    }

    let tempArray: IPerson[] | undefined = popularPersonList?.results;
    let tempFeaturedItem: IPerson | undefined = undefined;

    let itemListItemRandomNumber: number = 0;

    itemListItemRandomNumber =
      tempArray.length > 0 ? Math.floor(Math.random() * tempArray.length) : 0;

    tempFeaturedItem = tempArray[itemListItemRandomNumber];

    tempArray = removeItemFromArray<IPerson>(tempFeaturedItem, tempArray);

    setFeaturedPerson(tempFeaturedItem);

    setSlicedPersonList(tempArray);
  }

  useEffect(() => {
    if (popularPersonList && popularPersonList.results.length > 0) {
      sliceList();
    }
  }, [popularPersonList]);

  useEffect(() => {
    if (featuredPerson?.id) {
      fetchFeaturedPersonDetailsData();
    }
  }, [featuredPerson?.id]);

  return {
    slicedPersonList,
    featuredPerson,
    featuredPersonDetails,
    featuredPersonDetailsError,
    loadingData,
    loadingPersonDetails,
    dataError,
    sliceList,
  };
}
