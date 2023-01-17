import { useEffect, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { IPerson, IPersonApiReturn } from "../interfaces/IPerson";
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
    let itemListItemNumber: number = 0; //5 to list + 1 featured

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

    let temptemp = tempArray;

    tempArray = removeItemFromArray<IPerson>(tempFeaturedItem, tempArray);

    setFeaturedPerson(tempFeaturedItem);

    setSlicedPersonList(tempArray);

    console.log(`${"#".repeat(100)}> usePopularPerson`);
    console.log(`tempArray: ${tempArray?.length}`);
    console.log(tempArray);
    console.log(`tempFeaturedItem: ${tempFeaturedItem?.name}`);
    console.log(`itemListItemNumber: ${itemListItemNumber}`);
    console.log(`randomIntervalList: ${randomIntervalList}`);
    console.log(`temptemp: ${temptemp?.length}`);
    console.log(temptemp);
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

  return {
    slicedPersonList,
    featuredPerson,
    loadingData,
    dataError,
    sliceList,
  };
}
