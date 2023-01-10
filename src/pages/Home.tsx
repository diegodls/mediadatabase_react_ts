import { FeaturedContent } from "../components/FeaturedContent";
import { List } from "../components/List";
import { PopularPerson } from "../components/PopularPerson";
import { TrendingMovie } from "../components/TrendingMovie";
import { useGenres } from "../hooks/useGenres";
import { useGetPopular } from "../hooks/useGetPopular";
import { usePopularPersons } from "../hooks/usePopularPersons";
import { useTopRatedTvShows } from "../hooks/useTopRatedTvShows";
import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { useGetUpcoming } from "../hooks/useUpcomingMovies";
import { IPopularMoviesResults } from "../interfaces/IPopularMovies";
import { IPopularTvShowsResults } from "../interfaces/IPopularTvShows";
import { ITopRatedTvShowsResults } from "../interfaces/ITopRatedTvShows";
import { IUpcomingMoviesResults } from "../interfaces/IUpcomingMovies";

export function Home() {
  const { trendingMovies } = useTrendingMovies();

  const { popularList: popularMovieList, popularError: popularMovieListError } =
    useGetPopular<IPopularMoviesResults>("movie");

  const {
    popularList: popularTVList,
    popularItemFeatured: featuredPopularTvShow,
    popularListWithoutItemFeatured: popularTvShowsWithoutFeatured,
    popularError: popularTVListError,
  } = useGetPopular<IPopularTvShowsResults>("tv", true);

  const { upcoming, upcomingError } = useGetUpcoming("movie");

  // const { featuredPopularTvShow, popularTvShowsWithoutFeatured } =
  //   usePopularTvShows();

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
        <List<IPopularMoviesResults>
          type={"movie"}
          data={popularMovieList}
          error={popularMovieListError}
        />

        <List<IUpcomingMoviesResults>
          title='Próximos Filmes a Serem Lançados'
          type={"movie"}
          data={upcoming}
          error={upcomingError}
        />

        <FeaturedContent
          genresList={tvShowsGenresList}
          contentGenresList={featuredPopularTvShow?.genre_ids}
          contentID={featuredPopularTvShow?.id}
          title={featuredPopularTvShow?.name}
          subTitle={featuredPopularTvShow?.original_name}
          release_date={featuredPopularTvShow?.first_air_date}
          backdrop_path={featuredPopularTvShow?.backdrop_path}
          overview={featuredPopularTvShow?.overview}
          vote_average={featuredPopularTvShow?.vote_average}
          type={"tv"}
          showReadMore={true}
        />

        <List<IPopularTvShowsResults>
          type={"tv"}
          data={popularTvShowsWithoutFeatured}
        />

        <List<ITopRatedTvShowsResults>
          title='Series Melhores Avaliadas'
          type={"tv"}
          data={topRatedTvShows}
        />
      </div>
      <PopularPerson personList={personList} />
      popular[0].id = {popularMovieList ? popularMovieList[0].id : "Sem ID"}
      popularTVList[0].id = {popularTVList ? popularTVList[0].id : "Sem ID"}
      featuredPopularTvShow ={" "}
      {featuredPopularTvShow ? featuredPopularTvShow.name : "Sem item"}
    </div>
  );
}
