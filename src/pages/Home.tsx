import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { PopularMoviesList } from "../components/PopularMoviesList";
import { TrendingMovie } from "../components/TrendingMovie";

export function Home() {
  return (
    <div className='w-full min-w-[640px] flex flex-col overflow-hidden'>
      <Header />
      <TrendingMovie />
      <PopularMoviesList />

      <p className='text-7xl'>Home</p>
      <Link to='/details'>Detalhes</Link>
      <Link to='/nothing'>404</Link>
      <Link to='/nothing'>404</Link>
      <Link to='/nothing'>404</Link>
      <Link to='/nothing'>404</Link>
      <Link to='/nothing'>404</Link>
      <Link to='/nothing'>404</Link>
      <Link to='/nothing'>404</Link>
    </div>
  );
}
