import { useEffect } from "react";
import { FeaturedContent } from "../components/FeaturedContent";
import { List } from "../components/List";
import { Loading } from "../components/Loading";
import { useFetchData } from "../hooks/useFetchData";
import { UseGetRandomByDiscovery } from "../hooks/useGetRandomMovie";
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
    UseGetRandomByDiscovery("movie");

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

  const {
    data: comedyMovies,
    loadingData: loadingComedyMovies,
    dataError: errorComedyMovies,
  } = useFetchData<IDiscoveryMovies>(`${URL_DISCOVERY_BY_GENRES}35`);

  const {
    data: romanceMovies,
    loadingData: loadingRomanceMovies,
    dataError: errorRomanceMovies,
  } = useFetchData<IDiscoveryMovies>(`${URL_DISCOVERY_BY_GENRES}10749`);

  const {
    data: dramaMovies,
    loadingData: loadingDramaMovies,
    dataError: errorDramaMovies,
  } = useFetchData<IDiscoveryMovies>(`${URL_DISCOVERY_BY_GENRES}18`);

  const {
    data: documentaryMovies,
    loadingData: loadingDocumentaryMovies,
    dataError: errorDocumentaryMovies,
  } = useFetchData<IDiscoveryMovies>(`${URL_DISCOVERY_BY_GENRES}99`);

  const {
    data: terrorMovies,
    loadingData: loadingTerrorMovies,
    dataError: errorTerrorMovies,
  } = useFetchData<IDiscoveryMovies>(`${URL_DISCOVERY_BY_GENRES}27`);

  useEffect(() => {
    document.title = `MDB - Filmes`;
  }, []);

  return !loadingActionMovies &&
    !loadingAdventureMovies &&
    !loadingComedyMovies &&
    !loadingRomanceMovies &&
    !loadingDramaMovies &&
    !loadingDocumentaryMovies &&
    !loadingTerrorMovies &&
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
        showReadMore={true}
      />

      <List<IDiscoveryMoviesResult>
        data={actionMovies?.results}
        error={errorActionMovies}
        title='Ação'
        type={MEDIA_TYPE}
      />

      <List<IDiscoveryMoviesResult>
        data={adventureMovies?.results}
        error={errorAdventureMovies}
        title='Aventura'
        type={MEDIA_TYPE}
      />

      <List<IDiscoveryMoviesResult>
        data={comedyMovies?.results}
        error={errorComedyMovies}
        title='Comédia'
        type={MEDIA_TYPE}
      />

      <List<IDiscoveryMoviesResult>
        data={romanceMovies?.results}
        error={errorRomanceMovies}
        title='Romance'
        type={MEDIA_TYPE}
      />

      <List<IDiscoveryMoviesResult>
        data={dramaMovies?.results}
        error={errorDramaMovies}
        title='Drama'
        type={MEDIA_TYPE}
      />

      <List<IDiscoveryMoviesResult>
        data={documentaryMovies?.results}
        error={errorDocumentaryMovies}
        title='Documentário'
        type={MEDIA_TYPE}
      />

      <List<IDiscoveryMoviesResult>
        data={terrorMovies?.results}
        error={errorTerrorMovies}
        title='Terror'
        type={MEDIA_TYPE}
      />
    </div>
  ) : (
    <Loading />
  );
}
