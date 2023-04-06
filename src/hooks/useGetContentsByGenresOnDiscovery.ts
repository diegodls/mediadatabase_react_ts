import { useEffect, useState } from "react";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { IGenre, IGenres } from "../interfaces/IGenres";
import { service } from "../services/api";
import { MediaTypes } from "./../types/sharedTypes/MediaTypes";

interface IContentState<T> {
  genre: IGenre;
  type: MediaTypes;
  content: T;
}
interface IUseGetContentsByGenresOnDiscoveryReturn<T> {
  content: IContentState<T>[] | undefined;
  loadingContent: boolean;
  contentError?: IErrorFetchContent;
  getContentFromApi: () => void;
}

async function fetchData<T>(url: string): Promise<T | undefined> {
  return await service.get<T>(url).then((response) => {
    return response.data;
  });
}

function filterGenresID(
  genresToShow: string[],
  genresListFromApi: IGenres
): IGenre[] {
  let genresIDList: IGenre[] = [];

  for (let genreShow of genresToShow) {
    for (let genreFilter of genresListFromApi.genres) {
      if (genreShow === genreFilter.name) {
        genresIDList.push(genreFilter);
      }
    }
  }
  return genresIDList;
}

async function getContentListByGenresID<T>(
  type: MediaTypes,
  genresIDList: IGenre[]
): Promise<IContentState<T>[]> {
  const URL_DISCOVERY_BY_GENRES = `discover/${type}?sort_by=popularity.desc&include_adult=false&page=1&with_genres=`;
  let contentArray: IContentState<T>[] = [];

  for (const genre of genresIDList) {
    console.log(`${"!".repeat(50)}=> Buscando pelo genero: ${genre.name}`);

    const data = await fetchData<T>(`${URL_DISCOVERY_BY_GENRES}${genre.id}`);
    if (data) {
      contentArray.push({
        genre: genre,
        type,
        content: data,
      });
    }
  }

  return contentArray;
}

export function useGetContentsByGenresOnDiscovery<T>(
  type: MediaTypes,
  genresToShow: string[],
  genresListFromApi: IGenres
): IUseGetContentsByGenresOnDiscoveryReturn<T> {
  const [content, setContent] = useState<IContentState<T>[]>();
  const [loadingContent, setLoadingContent] = useState<boolean>(true);
  const [contentError, setContentError] = useState<IErrorFetchContent>();

  async function getContentFromApi() {
    setLoadingContent(true);
    setContentError(undefined);
    const genresIDList = filterGenresID(genresToShow, genresListFromApi);

    const ContentListFromApi: IContentState<T>[] =
      await getContentListByGenresID<T>(type, genresIDList);

    if (ContentListFromApi) {
      setContent(ContentListFromApi);
    } else {
      setContentError({
        status_code: 400,
        success: false,
        status_message: `Não foi possível localizar a lista de ${
          type === "movie" ? "filmes" : "series"
        } utilizando a lista ${genresToShow}`,
      });
    }

    setLoadingContent(false);
  }

  useEffect(() => {
    getContentFromApi();
  }, []);

  return { content, loadingContent, contentError, getContentFromApi };
}
