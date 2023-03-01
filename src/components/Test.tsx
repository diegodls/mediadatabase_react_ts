import { useFetchData } from "../hooks/useFetchData";
import {
  IRecommendedApiReturn,
  IRecommendedResult,
} from "../interfaces/IRecommended";
import { Recommended } from "./Recommended";

export function Test() {
  const {
    data: recommendedContent,
    dataError: recommendedContentError,
    fetchData: fetchRecommendedContent,
  } = useFetchData<IRecommendedApiReturn>(`movie/505642/recommendations`);

  return (
    <Recommended<IRecommendedResult>
      data={recommendedContent?.results}
      error={recommendedContentError}
    />
  );
}
