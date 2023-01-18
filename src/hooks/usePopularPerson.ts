import { useEffect, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { IPerson, IPersonApiReturn } from "../interfaces/IPerson";
import { IPersonDetails } from "../interfaces/IPersonDetails";
import { removeItemFromArray } from "../utils/removeItemFromArray";
import { useFetchData } from "./useFetchData";

export function usePopularPerson(url: string) {
  const {
    data: popularPersonList,
    dataError: popularPersonListError,
    loadingData: loadingPopularPersonList,
  } = useFetchData<IPersonApiReturn>(`${url}`);

  const [slicedPersonList, setSlicedPersonList] = useState<IPerson[]>();
  const [featuredPerson, setFeaturedPerson] = useState<IPerson>();
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [dataError, setDataError] = useState<IErrorFetchContent>();

  const {
    data: featuredPersonDetails,
    dataError: featuredPersonDetailsError,
    fetchData: fetchFeaturedPersonDetailsData,
  } = useFetchData<IPersonDetails>(`person/${featuredPerson?.id}`);

  function sliceList() {
    if (!popularPersonList || popularPersonList.results.length <= 0) {
      setDataError({
        status_code: 404,
        status_message: "Não foram encontrados pessoas!",
        success: false,
      });
      return;
    }

    let popularPersonListLength: number =
      popularPersonList && popularPersonList.results.length > 0
        ? popularPersonList.results.length
        : 0;

    let tempArray: IPerson[] | undefined = [];
    let tempFeaturedItem: IPerson | undefined = undefined;

    let listQuantity: number = 6; //5 to list + 1 featured
    let itemListItemNumber: number = 0;

    let randomIntervalList: number =
      popularPersonListLength > 0
        ? Math.floor(Math.random() * popularPersonListLength)
        : 0;

    if (randomIntervalList > popularPersonListLength - listQuantity)
      randomIntervalList = popularPersonListLength - listQuantity;

    if (randomIntervalList < listQuantity) randomIntervalList = listQuantity;

    tempArray = popularPersonList?.results.slice(
      randomIntervalList - listQuantity,
      randomIntervalList
    );

    itemListItemNumber =
      tempArray.length > 0 ? Math.floor(Math.random() * tempArray.length) : 0;

    tempFeaturedItem = tempArray[itemListItemNumber];

    tempArray = removeItemFromArray<IPerson>(tempFeaturedItem, tempArray);

    setFeaturedPerson(tempFeaturedItem);

    setSlicedPersonList(tempArray);
  }

  useEffect(() => {
    if (popularPersonListError) {
      setDataError(popularPersonListError);
    }
  }, [popularPersonListError]);

  useEffect(() => {
    if (loadingPopularPersonList) {
      setLoadingData(loadingPopularPersonList);
    }
  }, [loadingPopularPersonList]);

  useEffect(() => {
    sliceList();
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
    dataError,
    sliceList,
  };
}
