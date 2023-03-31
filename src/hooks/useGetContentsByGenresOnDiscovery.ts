import { useState } from "react";
import { IDiscoveryMoviesResult } from "../interfaces/IDiscoveryMovies";
import { IDiscoveryTvResult } from "../interfaces/IDiscoveryTv";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { IGenre, IGenres } from "../interfaces/IGenres";
import { service } from "../services/api";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";

interface IUseGetContentsByGenresOnDiscovery {
  type: MediaTypes;
  genresToShow: string[];
  genresListFromApi: IGenres;
}

type TRandomContentState = IDiscoveryMoviesResult | IDiscoveryTvResult;

async function fetchData<T>(url: string): Promise<T> {
  return await service.get<T>(url).then((response) => {
    return response.data;
  });
}

async function getGenresID({
  type,
  genresToShow,
  genresListFromApi,
}: IUseGetContentsByGenresOnDiscovery) {
  let genresID: number[] = [];

  for (const genre in genresToShow) {
  }
}

function filterGenresId(
  genresToShow: string[],
  genresListFromApi: IGenres
): IGenre["id"][] {
  let genresIdList: IGenre["id"][] = [];

  for (let i in genresListFromApi.genres) {
    if (genresToShow.includes(genresListFromApi.genres[i].name)) {
      genresIdList.push(genresListFromApi.genres[i].id);
    }
  }

  return genresIdList;
}

export function useGetContentsByGenresOnDiscovery<T>({
  type,
  genresToShow,
  genresListFromApi,
}: IUseGetContentsByGenresOnDiscovery) {
  const URL_DISCOVERY_BY_GENRES = `discover/${type}?sort_by=popularity.desc&include_adult=false&page=1&with_genres=`;

  const [randomContent, setRandomContent] = useState<T>();
  const [loadingRandomContent, setLoadingRandomContent] =
    useState<boolean>(true);
  const [randomContentError, setRandomContentError] =
    useState<IErrorFetchContent>();

  const genresIdList = filterGenresId(genresToShow, genresListFromApi);

  return { randomContent, loadingRandomContent, randomContentError };
}
