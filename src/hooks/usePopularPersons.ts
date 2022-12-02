import { useEffect, useState } from "react";
import { IPerson, IPersonApiReturn } from "../interfaces/IPerson";
import { service } from "../services/api";

export function usePopularPersons() {
  console.log(`${"#".repeat(10)} - usePopularPersons`);

  const [personList, setPersonList] = useState<IPerson[]>();

  async function getPopularPersons(): Promise<IPerson[]> {
    const apiResult: IPersonApiReturn = await service
      .get<Promise<IPersonApiReturn>>(`person/popular/`)
      .then((response) => {
        return response.data;
      });

    return apiResult.results;
  }

  async function fetchOverview() {
    const popularPersons = await getPopularPersons();

    console.log(`${"#".repeat(20)} - popularPersons`);
    console.log(popularPersons);

    if (popularPersons) {
      setPersonList(popularPersons);
    }
  }
  useEffect(() => {
    fetchOverview();
  }, []);

  return {
    personList,
  };
}
