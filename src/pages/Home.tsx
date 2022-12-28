import { FeaturedContent } from "../components/FeaturedContent";
import { HomeList } from "../components/HomeList";
import { PopularPerson } from "../components/PopularPerson";
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
    <div className='w-full flex flex-col items-center'>
      <TrendingMovie
        trendingMovies={trendingMovies}
        movieGenresList={movieGenresList}
      />

      <div className='relative md:mt-[-48px]'>
        <HomeList<IPopularMoviesResults>
          rowTitle='Filmes Populares'
          type='movie'
          data={popularMovies}
          titleBg={false}
        />

        <HomeList<IUpcomingMoviesResults>
          rowTitle='Próximos Filmes a Serem Lançados'
          type='movie'
          data={upcomingMovies}
        />

        <FeaturedContent
          genresList={tvShowsGenresList}
          contentGenresList={featuredPopularTvShow?.genre_ids}
          contentID={featuredPopularTvShow?.id}
          title={featuredPopularTvShow?.name}
          subTitle={featuredPopularTvShow?.original_name}
          backdrop_path={featuredPopularTvShow?.backdrop_path}
          overview={featuredPopularTvShow?.overview}
          vote_average={featuredPopularTvShow?.vote_average}
          type='tvshow'
          showReadMore={true}
        />

        <HomeList<IPopularTvShowsResults>
          rowTitle='Series Populares'
          type='tvshow'
          data={popularTvShowsWithoutFeatured}
        />

        <HomeList<ITopRatedTvShowsResults>
          rowTitle='Series Melhores Avaliadas'
          type='tvshow'
          data={topRatedTvShows}
        />
      </div>

      <PopularPerson personList={personList} />
    </div>
  );
}
