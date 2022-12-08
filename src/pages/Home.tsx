import { HomeList } from "../components/HomeList";
import { PopularPerson } from "../components/PopularPerson";
import { PopularTvShow } from "../components/PopularTvShows";
import { TrendingMovie } from "../components/TrendingMovie";
import { useGenres } from "../hooks/useGenres";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { usePopularPersons } from "../hooks/usePopularPersons";
import { usePopularTvShows } from "../hooks/usePopularTvShows";
import { useTopRatedTvShows } from "../hooks/useTopRatedTvShows";
import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { useUpcomingMovies } from "../hooks/useUpcomingMovies";
import { IPopularMoviesResults } from "../interfaces/IPopularMovies";
import { IPopularTvShowsResults } from "../interfaces/IPopularTvShows";
import { ITopRatedTvShowsResults } from "../interfaces/ITopRatedTvShows";
import { IUpcomingMoviesResults } from "../interfaces/IUpcomingMovies";

export function Home() {
  const { trendingMovies } = useTrendingMovies();
  const { popularMovies } = usePopularMovies();
  const { upcomingMovies } = useUpcomingMovies();
  const { featuredPopularTvShow, popularTvShowsWithoutFeatured } =
    usePopularTvShows();
  const { topRatedTvShows } = useTopRatedTvShows();
  const { personList } = usePopularPersons();
  const { tvShowsGenresList, movieGenresList } = useGenres();

  return (
    <>
      <TrendingMovie
        trendingMovies={trendingMovies ? trendingMovies : null}
        movieGenresList={movieGenresList ? movieGenresList : null}
      />

      <div className='relative mt-[-48px]'>
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

        <PopularTvShow
          featuredPopularTvShow={
            featuredPopularTvShow ? featuredPopularTvShow : null
          }
          tvShowsGenresList={tvShowsGenresList ? tvShowsGenresList : null}
        />

        <HomeList<IPopularTvShowsResults>
          rowTitle='Series Populares'
          type='TVSHOWS'
          data={popularTvShowsWithoutFeatured}
        />

        <HomeList<ITopRatedTvShowsResults>
          rowTitle='Series Melhores Avaliadas'
          type='TVSHOWS'
          data={topRatedTvShows}
        />
      </div>

      <PopularPerson personList={personList ? personList : null} />
    </>
  );
}
