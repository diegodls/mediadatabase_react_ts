import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { TrendingMovieAndSeries } from "../components/TrendingMovieAndSeries";
import { IMovieDetails } from "../interfaces/IMovieDetails";
import { getMoviesDetails } from "../services/api";

export function Home() {
  const [apiMovieDBData, setMovieDBApiData] = useState<IMovieDetails>();

  const [loadingData, setLoadingData] = useState<boolean>(false);

  async function fetchOverview() {
    const movie = await getMoviesDetails(76341);

    if (movie) {
      setMovieDBApiData(movie);
    }
  }
  useEffect(() => {
    fetchOverview();
  }, []);

  console.log("Home Rendering");

  return (
    <div className='h-full w-full flex flex-col items-center'>
      <Header />
      <TrendingMovieAndSeries />
      <p className='text-7xl'>Home</p>
      <Link to='/details'>Detalhes</Link>
      <Link to='/nothing'>404</Link>
      <p>{apiMovieDBData ? `Data: ${apiMovieDBData.title}` : "Sem movie"}</p>
      <Loading show={loadingData} />
    </div>
  );
}
