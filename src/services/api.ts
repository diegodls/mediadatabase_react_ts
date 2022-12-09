import axios from "axios";

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
