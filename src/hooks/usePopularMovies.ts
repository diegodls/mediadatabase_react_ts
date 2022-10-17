import { useEffect, useState } from "react";
import {
  IPopularMoviesApiReturn,
  IPopularMoviesResults,
} from "../interfaces/IPopularMovies";
import { service } from "../services/api";

export function usePopularMovies() {
  const [popularMovies, setPopularMovies] = useState<IPopularMoviesResults[]>();

  async function getPopular(): Promise<IPopularMoviesResults[]> {
    const popularData: IPopularMoviesApiReturn = await service
      .get<Promise<IPopularMoviesApiReturn>>(`/movie/popular`)
      .then((response) => {
        return response.data;
      });

    console.log("popularData.results");
    console.log(popularData.results.length);

    return popularData.results;
  }

  async function fetchPopular() {
    const popular = await getPopular();

    if (popular) {
      setPopularMovies(popular);
    }
  }
  useEffect(() => {
    fetchPopular();
  }, []);

  console.log("usePopularMovies");

  return {
    popularMovies,
  };
}
