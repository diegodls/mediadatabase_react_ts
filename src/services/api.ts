import axios from "axios";
import { IMovieDetails } from "../interfaces/IMovieDetails";

export const service = axios.create({
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
