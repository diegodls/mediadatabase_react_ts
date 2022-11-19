import { Header } from "../components/Header";
import { HomeList } from "../components/HomeList";
import { PopularTvShow } from "../components/PopularTvShows";
import { TrendingMovie } from "../components/TrendingMovie";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { usePopularTvShows } from "../hooks/usePopularTvShows";
import { useTopRatedTvShows } from "../hooks/useTopRatedTvShows";
import { useUpcomingMovies } from "../hooks/useUpcomingMovies";
import { IPopularMoviesResults } from "../interfaces/IPopularMovies";
import { IPopularTvShowsResults } from "../interfaces/IPopularTvShows";
import { ITopRatedTvShowsResults } from "../interfaces/ITopRatedTvShows";
import { IUpcomingMoviesResults } from "../interfaces/IUpcomingMovies";

export function Home() {
  const { popularMovies } = usePopularMovies();
  const { upcomingMovies } = useUpcomingMovies();
  const { popularTvShowsWithoutFeatured } = usePopularTvShows();
  const { topRatedTvShows } = useTopRatedTvShows();

  return (
    <div className='w-full min-w-[640px] flex flex-col overflow-hidden'>
      <Header />

      <TrendingMovie />

      <div className='relative top-[-48px]'>
        <HomeList<IPopularMoviesResults>
          rowTitle='Filmes Populares'
          type='MOVIE'
          data={popularMovies}
        />

        <HomeList<IUpcomingMoviesResults>
          rowTitle='Próximos Filmes a serem lançados'
          type='MOVIE'
          data={upcomingMovies}
        />

        <PopularTvShow />

        <div className='relative top-[-48px]'>
          <HomeList<IPopularTvShowsResults>
            rowTitle='Series Populares'
            type='TVSHOWS'
            data={popularTvShowsWithoutFeatured}
          />
        </div>
        <HomeList<ITopRatedTvShowsResults>
          rowTitle='Series Melhores Avaliadas'
          type='TVSHOWS'
          data={topRatedTvShows}
        />
      </div>
    </div>
  );
}
