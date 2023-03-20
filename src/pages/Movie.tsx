import { useEffect, useState } from "react";
import { FeaturedContent } from "../components/FeaturedContent";
import { List } from "../components/List";
import { Loading } from "../components/Loading";
import { useFetchData } from "../hooks/useFetchData";
import {
  IDiscoveryMovies,
  IDiscoveryMoviesResult,
} from "../interfaces/IDiscoveryMovies";
import { IGenres } from "../interfaces/IGenres";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";

export function Movie() {
  const URL_DISCOVERY_BY_GENRES =
    "discover/movie?sort_by=popularity.desc&include_adult=false&page=1&with_genres=";

  const MEDIA_TYPE: MediaTypes = "movie";

  const { data: movieGenresList } = useFetchData<IGenres>(`genre/movie/list`);

  const {
    data: actionMovies,
    loadingData: loadingActionMovies,
    dataError: errorActionMovies,
    fetchData: fetchActionMovies,
  } = useFetchData<IDiscoveryMovies>(`${URL_DISCOVERY_BY_GENRES}28`);

  const {
    data: adventureMovies,
    loadingData: loadingAdventureMovies,
    dataError: errorAdventureMovies,
    fetchData: fetchAdventureMovies,
  } = useFetchData<IDiscoveryMovies>(`${URL_DISCOVERY_BY_GENRES}12`);

  const FEATURED_MOVIE_OPTIONS: (IDiscoveryMovies | undefined)[] = [
    actionMovies,
    adventureMovies,
  ];

  const [featuredMovie, setFeaturedMovie] = useState<IDiscoveryMoviesResult>();

  useEffect(() => {
    document.title = `MDB - Filmes`;
  }, []);

  useEffect(() => {
    console.log(`${"@".repeat(50)}useEffect setFeaturedMovie`);
    if (featuredMovie) {
      console.log("Temmm");

      console.log(featuredMovie);

      return;
    }

    let featuredItemFromOptions: IDiscoveryMoviesResult | undefined = undefined;
    let randomNumberOfTypes: number = 0;
    let randomNumberOfMovies: number = 0;

    if (actionMovies || adventureMovies) {
      randomNumberOfTypes = Math.ceil(
        Math.random() * FEATURED_MOVIE_OPTIONS.length
      );

      if (FEATURED_MOVIE_OPTIONS[randomNumberOfTypes]?.results) {
        const quantityOfMoviesByType =
          FEATURED_MOVIE_OPTIONS[randomNumberOfTypes]?.results.length || 20;

        randomNumberOfMovies = Math.ceil(
          Math.random() * quantityOfMoviesByType
        );
      }

      featuredItemFromOptions =
        FEATURED_MOVIE_OPTIONS[randomNumberOfTypes]?.results[
          randomNumberOfMovies
        ];

      console.log(`randomNumberOfTypes: ${randomNumberOfTypes}`);
      console.log(`randomNumberOfMovies: ${randomNumberOfMovies}`);

      console.log(featuredItemFromOptions?.title);

      setFeaturedMovie(featuredItemFromOptions);
    }
  }, [FEATURED_MOVIE_OPTIONS]);

  return !loadingActionMovies && !loadingAdventureMovies ? (
    <div className='w-full mt-headerHeight'>
      <p className='w-full h-12 flex items-center justify-start bg-gray-800 text-red-600'>
        FEATURED_MOVIE_OPTIONS: {FEATURED_MOVIE_OPTIONS.length}
      </p>
      <FeaturedContent
        genresList={movieGenresList}
        contentGenresList={featuredMovie?.genre_ids}
        contentID={featuredMovie?.id}
        title={featuredMovie?.title}
        subTitle={featuredMovie?.original_title}
        release_date={featuredMovie?.release_date}
        backdrop_path={featuredMovie?.backdrop_path}
        overview={featuredMovie?.overview}
        vote_average={featuredMovie?.vote_average}
        type={MEDIA_TYPE}
      />

      <List<IDiscoveryMoviesResult>
        data={actionMovies?.results}
        error={errorActionMovies}
        title='Filmes de Ação'
        type={MEDIA_TYPE}
      />

      <List<IDiscoveryMoviesResult>
        data={adventureMovies?.results}
        error={errorAdventureMovies}
        title='Filmes de Aventura'
        type={MEDIA_TYPE}
      />
    </div>
  ) : (
    <Loading />
  );
}
