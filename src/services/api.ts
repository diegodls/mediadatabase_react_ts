import axios from "axios";
import { IMovieDetails } from "../interfaces/IMovieDetails";
import {
  ITrending,
  ITrendingResult,
  ITrendingTime,
  ITrendingType,
} from "../interfaces/ITrending";

const service = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_THEMOVIEDB_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    language: `${import.meta.env.VITE_THEMOVIEDB_LANGUAGE}`,
  },
});

export async function getMoviesDetails(
  movieId: number
): Promise<IMovieDetails> {
  let movieData: IMovieDetails = await service
    .get<Promise<IMovieDetails>>(`/movie/${movieId}`)
    .then((response) => {
      return response.data;
    });

  return movieData;
}

export async function getTrending(
  type: ITrendingType,
  time: ITrendingTime
): Promise<ITrendingResult[]> {
  const trendingData: ITrending = await service
    .get<Promise<ITrending>>(`/trending/${type}/${time}`)
    .then((response) => {
      return response.data;
    });

  return trendingData.results;
}
