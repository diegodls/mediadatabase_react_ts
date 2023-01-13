import { useEffect, useState } from "react";
import { IPerson, IPersonApiReturn } from "../interfaces/IPerson";
import { service } from "../services/api";

export function usePopularPersons() {
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

    if (popularPersons) {
      let filteredPopularPersons = popularPersons.filter(
        (person) => person.profile_path
      );
      setPersonList(filteredPopularPersons);
    }
  }
  useEffect(() => {
    fetchOverview();
  }, []);

  return {
    personList,
  };
}
