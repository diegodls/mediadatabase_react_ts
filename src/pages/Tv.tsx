import { useEffect } from "react";
import { FeaturedContent } from "../components/FeaturedContent";
import { List } from "../components/List";
import { Loading } from "../components/Loading";
import { useFetchData } from "../hooks/useFetchData";
import { useGetContentsByGenresOnDiscovery } from "../hooks/useGetContentsByGenresOnDiscovery";
import { useGetRandomByDiscovery } from "../hooks/useGetRandomByDiscovery";
import { IDiscoveryTv, IDiscoveryTvResult } from "../interfaces/IDiscoveryTv";
import { IGenres } from "../interfaces/IGenres";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";
import { tvGenresMock } from "../utils/Genres";
import { translateTitle } from "../utils/translateTitle";

export function Tv() {
  const MEDIA_TYPE: MediaTypes = "tv";

  const GENRES_TO_SHOW: string[] = [
    "Action & Adventure",
    "Comédia",
    "Animação",
    "Kids",
    "Família",
    "Drama",
    "Mistério",
    "Documentário",
    "Crime",
  ];

  const { data: tvGenresList } = useFetchData<IGenres>(
    `genre/${MEDIA_TYPE}/list`
  );

  const { randomContent, loadingRandomContent, randomContentError } =
    useGetRandomByDiscovery<IDiscoveryTvResult>("tv");

  const { content, loadingContent, contentError } =
    useGetContentsByGenresOnDiscovery<IDiscoveryTv>(
      MEDIA_TYPE,
      GENRES_TO_SHOW,
      tvGenresList ? tvGenresList : tvGenresMock
    );

  useEffect(() => {
    document.title = `MDB - Series`;
  }, []);

  const isFetchingData: boolean = loadingRandomContent || loadingContent;

  return isFetchingData ? (
    <Loading />
  ) : (
    <div className='w-full'>
      <FeaturedContent
        genresList={tvGenresList}
        contentGenresList={randomContent?.genre_ids}
        contentID={randomContent?.id}
        title={randomContent?.name}
        subTitle={randomContent?.original_name}
        release_date={randomContent?.first_air_date}
        backdrop_path={randomContent?.backdrop_path}
        overview={randomContent?.overview}
        vote_average={randomContent?.vote_average}
        type={MEDIA_TYPE}
        showReadMore={true}
      />
      {content && content.length > 0
        ? content.map((item) => (
            <div className='w-full' key={item.genre.id}>
              <List<IDiscoveryTvResult>
                data={item.content.results}
                error={contentError}
                title={translateTitle(item.genre.name)}
                type={MEDIA_TYPE}
              />
            </div>
          ))
        : null}
    </div>
  );
}
