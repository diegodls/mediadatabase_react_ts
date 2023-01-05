import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FeaturedContent } from "../components/FeaturedContent";
import { Loading } from "../components/Loading";
import { MovieVideos } from "../components/MovieVideos";
import { SimilarMovies } from "../components/SimilarMovies";
import { useGenres } from "../hooks/useGenres";

import { CastList } from "../components/CastList";
import { ErrorFetchContentFull } from "../components/ErrorFetchContentFull";
import { KeywordList } from "../components/KeywordsList";
import { Summary } from "../components/Summary";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { IMovieOverview } from "../interfaces/IMovieOverview";
import { service } from "../services/api";

export function MovieOverview() {
  let { movieId } = useParams();

  const { movieGenresList } = useGenres();

  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [movieOverview, setMovieOverview] = useState<IMovieOverview>();
  const [movieErrorBasicFetch, setMovieErrorBasicFetch] =
    useState<IErrorFetchContent>();

  const genres_id: number[] | undefined = movieOverview?.genres.map((genre) => {
    return genre.id;
  });

  async function fetchData(url: string) {
    setLoadingData(true);

    const data = await service
      .get<Promise<IMovieOverview>>(url)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        setMovieErrorBasicFetch(err);
      })
      .finally(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
          setLoadingData(false);
        }, 500);
      });

    if (data) {
      setMovieOverview(data);
    }
  }

  useEffect(() => {
    fetchData(`/movie/${movieId}`);
  }, [movieId]);

  return (
    <div className='w-full h-full'>
      {loadingData ? (
        <Loading />
      ) : (
        <ErrorFetchContentFull error={movieErrorBasicFetch}>
          <div className='w-full h-full flex flex-col gap-4'>
            <FeaturedContent
              genresList={movieGenresList}
              contentGenresList={genres_id}
              title={movieOverview?.title}
              subTitle={movieOverview?.original_title}
              backdrop_path={movieOverview?.backdrop_path}
              overview={movieOverview?.overview}
              vote_average={movieOverview?.vote_average}
              type={"movie"}
              showReadMore={false}
              showInfo={false}
            />

            <Summary
              title={movieOverview?.title}
              overview={movieOverview?.overview}
            />

            <KeywordList title='TAGS' contentID={movieId} type='movie' />

            <CastList title='Elenco' contentID={movieId} type='movie' />

            <MovieVideos title='Vídeos' contentID={movieId} type='movie' />

            <SimilarMovies
              title='Você também pode gostar'
              contentID={movieId}
              type='movie'
            />
          </div>
        </ErrorFetchContentFull>
      )}
    </div>
  );
}
