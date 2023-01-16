import { FeaturedContent } from "../components/FeaturedContent";
import { List } from "../components/List";
import { Loading } from "../components/Loading";
import { PopularPerson } from "../components/PopularPerson";
import { TrendingMovie } from "../components/TrendingMovie";
import { useFetchData } from "../hooks/useFetchData";
import { usePopular } from "../hooks/usePopular";
import { IGenres } from "../interfaces/IGenres";
import { IPersonApiReturn } from "../interfaces/IPerson";
import {
  IPopularMoviesApiReturn,
  IPopularMoviesResults,
} from "../interfaces/IPopularMovies";
import { IPopularTvShowsResults } from "../interfaces/IPopularTvShows";
import {
  ITopRatedTvShowsApiReturn,
  ITopRatedTvShowsResults,
} from "../interfaces/ITopRatedTvShows";
import { ITrendingMovies } from "../interfaces/ITrendingMovies";
import {
  IUpcomingMoviesApiReturn,
  IUpcomingMoviesResults,
} from "../interfaces/IUpcomingMovies";

export function Home() {
  const { data: trendingMovie, loadingData: loadingTrendingMovie } =
    useFetchData<ITrendingMovies>("/trending/movie/week");

  const { data: popularMovieList, dataError: popularMovieListError } =
    useFetchData<IPopularMoviesApiReturn>(`movie/popular`);

  const {
    dataItemFeatured: featuredPopularTvShow,
    dataWithoutItemFeatured: popularTvShowsWithoutFeatured,
    dataError: popularTVListError,
  } = usePopular<IPopularTvShowsResults>("tv", { splitFeaturedItem: true });

  const { data: upcomingMovies, dataError: upcomingMoviesError } =
    useFetchData<IUpcomingMoviesApiReturn>(`movie/upcoming`);

  const { data: topRatedTvShow, dataError: topRatedTvShowError } =
    useFetchData<ITopRatedTvShowsApiReturn>("tv/top_rated");

  const { data: popularPersonList } =
    useFetchData<IPersonApiReturn>(`person/popular`);

  const { data: movieGenresList } = useFetchData<IGenres>(`genre/movie/list`);

  const { data: tvShowGenresList } = useFetchData<IGenres>(`genre/tv/list`);

  const trendingMovieResultsExists =
    trendingMovie?.results && trendingMovie?.results.length > 0;

  return (
    <div
      className='w-full flex flex-col items-center'
      style={{
        height: `${!trendingMovieResultsExists ? "100vh" : ""}`,
        overflow: `${!trendingMovieResultsExists ? "hidden" : ""}`,
      }}
    >
      {!trendingMovieResultsExists || loadingTrendingMovie ? (
        <Loading onTop={true} />
      ) : null}

      <TrendingMovie
        trendingMovies={trendingMovie?.results}
        movieGenresList={movieGenresList}
      />

      <div className='md:mt-[-48px]'>
        <List<IPopularMoviesResults>
          type={"movie"}
          data={popularMovieList?.results}
          error={popularMovieListError}
        />

        <List<IUpcomingMoviesResults>
          title='Em breve nos cinemas'
          type={"movie"}
          data={upcomingMovies?.results}
          error={upcomingMoviesError}
        />

        <div className='mt-2'>
          <FeaturedContent
            genresList={tvShowGenresList}
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
          <div className='md:mt-[-48px] z-30'>
            <List<IPopularTvShowsResults>
              type={"tv"}
              data={popularTvShowsWithoutFeatured}
              error={popularTVListError}
            />

            <List<ITopRatedTvShowsResults>
              title='Series Melhores Avaliadas'
              type={"tv"}
              data={topRatedTvShow?.results}
              error={topRatedTvShowError}
            />
          </div>

          <PopularPerson personList={popularPersonList?.results} />
        </div>
      </div>
    </div>
  );
}
