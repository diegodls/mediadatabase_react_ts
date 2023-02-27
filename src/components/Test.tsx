import { useState } from "react";

import { useFetchData } from "../hooks/useFetchData";
import { usePopularPerson } from "../hooks/usePopularPerson";
import { IMovieVideoResults, IMovieVideos } from "../interfaces/IMovieVideos";
import { ScrollableComponent } from "./ScrollableComponent";

export function Test() {
  const {
    data: videos,
    dataError: videosError,
    fetchData: fetchVideos,
  } = useFetchData<IMovieVideos>(`movie/505642/videos`);

  const {
    slicedPersonList,
    featuredPerson,
    dataError: popularPersonListError,
    featuredPersonDetails,
    loadingData: loadingPopularPersonList,
  } = usePopularPerson(`person/popular`);

  const [featuredMovie, SetFeaturedMovie] = useState<IMovieVideoResults>(
    videos?.results[0] || ({} as IMovieVideoResults)
  );

  return (
    <div className='w-full h-52 mt-12 bg-yellow-400'>
      <ScrollableComponent>
        <ul className='h-full flex flex-row gap-2 items-center' role='list'>
          {videos?.results.map((movie: IMovieVideoResults) => (
            <li
              className={`min-w-fit h-full cursor-pointer rounded-md overflow-hidden bg-black scale-95 hover:scale-100 transition-all ${
                movie.id === featuredMovie.id
                  ? "border-4 border-customColors-red-500"
                  : ""
              }`}
              key={movie.key}
            >
              <img
                src={`https://i.ytimg.com/vi/${movie.key}/hqdefault.jpg`}
                alt={movie.name}
                className='h-full rounded-md'
              />
            </li>
          ))}
        </ul>
      </ScrollableComponent>
    </div>
  );
}
