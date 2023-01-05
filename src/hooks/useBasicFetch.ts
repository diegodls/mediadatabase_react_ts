import { service } from "../services/api";

export async function useBasicFetch<T = unknown>(url: string) {
  const movieDetailsData: T = await service.get(url).then((response) => {
    return response.data;
  });

  return movieDetailsData;
}
