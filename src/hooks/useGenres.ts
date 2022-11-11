import { useEffect, useState } from "react";
import { IGenres } from "../interfaces/IGenres";

import { service } from "../services/api";

export function useGenres() {
  const [genresList, setGenresList] = useState<IGenres>();

  async function getGenre(): Promise<IGenres> {
    const genresData: IGenres = await service
      .get<Promise<IGenres>>(`genre/movie/list`)
      .then((response) => {
        return response.data;
      });
    return genresData;
  }

  async function fetchGenres() {
    const genres = await getGenre();

    if (genres) {
      setGenresList(genres);
    }
  }

  useEffect(() => {
    fetchGenres();
  }, []);

  return {
    genresList,
  };
}
