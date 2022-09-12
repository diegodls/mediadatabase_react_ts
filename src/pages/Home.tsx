import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { IMovieDetails } from "../interfaces/IMovieDetails";
import { getMoviesDetails, getTrending } from "../services/api";

export function Home() {
  const [apiMovieDBData, setMovieDBApiData] = useState<IMovieDetails>();

  const [loadingData, setLoadingData] = useState<boolean>(false);

  async function fetchOverview() {
    setLoadingData(true);
    const movie = await getMoviesDetails(76341);

    const trending = getTrending("movie", "week");

    if (movie) {
      setMovieDBApiData(movie);
    }

    setLoadingData(false);
  }
  useEffect(() => {
    fetchOverview();
  }, []);

  return (
    <div className='h-full w-full flex flex-col items-center'>
      <Header />
      <Loading show={loadingData} />
      <p className='text-7xl'>Home</p>
      <Link to='/details'>Detalhes</Link>
      <Link to='/nothing'>404</Link>
      <p>{apiMovieDBData ? `Data: ${apiMovieDBData.title}` : "Sem movie"}</p>
    </div>
  );
}
