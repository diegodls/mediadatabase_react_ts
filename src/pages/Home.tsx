import { Header } from "../components/Header";
import { PopularMoviesList } from "../components/PopularMoviesList";
import { TrendingMovie } from "../components/TrendingMovie";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { usePopularTvShows } from "../hooks/usePopularTvShows";
import { IPopularMoviesResults } from "../interfaces/IPopularMovies";
import { IPopularTvShowsResults } from "../interfaces/IPopularTvShows";

export function Home() {
  const { popularMovies } = usePopularMovies();
  const { popularTvShows } = usePopularTvShows();

  return (
    <div className='w-full min-w-[640px] flex flex-col overflow-hidden'>
      <Header />

      <TrendingMovie />

      <PopularMoviesList<IPopularMoviesResults>
        rowTitle='Populares'
        type='MOVIE'
        data={popularMovies}
      />

      <PopularMoviesList<IPopularTvShowsResults>
        rowTitle='Populares'
        type='MOVIE'
        data={popularTvShows}
      />
    </div>
  );
}
