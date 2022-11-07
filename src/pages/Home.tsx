import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PopularMoviesList } from "../components/PopularMoviesList";
import { TrendingMovie } from "../components/TrendingMovie";
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
    <div className='w-full h-full flex flex-col'>
      <Header />
      <TrendingMovie />
      <PopularMoviesList />
      <p className='text-7xl'>Home</p>
      <Link to='/details'>Detalhes</Link>
      <Link to='/nothing'>404</Link>
      <p>{apiMovieDBData ? `Data: ${apiMovieDBData.title}` : "Sem movie"}</p>
      <Loading show={loadingData} />
    </div>
  );
}
