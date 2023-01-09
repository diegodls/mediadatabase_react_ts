import { FeaturedContent } from "../components/FeaturedContent";
import { List } from "../components/List";
import { PopularMovies } from "../components/PopularMovies";
import { PopularPerson } from "../components/PopularPerson";
import { PopularTvShows } from "../components/PopularTvShows";
import { TrendingMovie } from "../components/TrendingMovie";
import { UpcomingMovies } from "../components/UpcomingMovies";
import { useGenres } from "../hooks/useGenres";
import { usePopularPersons } from "../hooks/usePopularPersons";
import { usePopularTvShows } from "../hooks/usePopularTvShows";
import { useTopRatedTvShows } from "../hooks/useTopRatedTvShows";
import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { ITopRatedTvShowsResults } from "../interfaces/ITopRatedTvShows";

export function Home() {
  const { trendingMovies } = useTrendingMovies();
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
        <PopularMovies />

        <UpcomingMovies />

        <FeaturedContent
          genresList={tvShowsGenresList}
          contentGenresList={featuredPopularTvShow?.genre_ids}
          contentID={featuredPopularTvShow?.id}
          title={featuredPopularTvShow?.name}
          subTitle={featuredPopularTvShow?.original_name}
          backdrop_path={featuredPopularTvShow?.backdrop_path}
          overview={featuredPopularTvShow?.overview}
          vote_average={featuredPopularTvShow?.vote_average}
          type='tv'
          showReadMore={true}
        />

        <PopularTvShows />

        <List<ITopRatedTvShowsResults>
          title='Series Melhores Avaliadas'
          type='tv'
          data={topRatedTvShows}
        />
      </div>

      <PopularPerson personList={personList} />
    </div>
  );
}
