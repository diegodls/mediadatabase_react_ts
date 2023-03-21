import { useEffect } from "react";
import { FeaturedContent } from "../components/FeaturedContent";
import { List } from "../components/List";
import { Loading } from "../components/Loading";
import { useFetchData } from "../hooks/useFetchData";
import { useGetRandomMovie } from "../hooks/useGetRandomMovie";
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

  const { randomMovie, loadingRandomMovie, randomMovieError } =
    useGetRandomMovie();

  const {
    data: actionMovies,
    loadingData: loadingActionMovies,
    dataError: errorActionMovies,
  } = useFetchData<IDiscoveryMovies>(`${URL_DISCOVERY_BY_GENRES}28`);

  const {
    data: adventureMovies,
    loadingData: loadingAdventureMovies,
    dataError: errorAdventureMovies,
  } = useFetchData<IDiscoveryMovies>(`${URL_DISCOVERY_BY_GENRES}12`);

  useEffect(() => {
    document.title = `MDB - Filmes`;
  }, []);

  return !loadingActionMovies &&
    !loadingAdventureMovies &&
    !loadingRandomMovie ? (
    <div className='w-full mt-headerHeight'>
      <FeaturedContent
        genresList={movieGenresList}
        contentGenresList={randomMovie?.genre_ids}
        contentID={randomMovie?.id}
        title={randomMovie?.title}
        subTitle={randomMovie?.original_title}
        release_date={randomMovie?.release_date}
        backdrop_path={randomMovie?.backdrop_path}
        overview={randomMovie?.overview}
        vote_average={randomMovie?.vote_average}
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
