import axios from "axios";

export const service = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 3000,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_THEMOVIEDB_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    language: `${import.meta.env.VITE_THEMOVIEDB_LANGUAGE}`,
  },
});

export const serviceWithoutParams = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 3000,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_THEMOVIEDB_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
});
