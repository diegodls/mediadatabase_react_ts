import { usePopularTvShows } from "../hooks/usePopularTvShows";
import { API_BASEURL_IMAGE_1280 } from "../utils/constants";

export function PopularTvShow() {
  const { featuredPopularTvShow } = usePopularTvShows();

  return featuredPopularTvShow ? (
    <div className='w-full max-h-[80vh] flex items-center justify-center relative overflow-hidden bg-red-500'>
      <div className='ml-16 top-0 left-0 transform translate-y-1/2 absolute bg-green-500'>
        <h1>{featuredPopularTvShow.name}</h1>
      </div>
      <img
        className='w-full h-auto flex-shrink-0 select-none bg-cover'
        src={API_BASEURL_IMAGE_1280 + featuredPopularTvShow?.backdrop_path}
        alt={featuredPopularTvShow?.name}
        title={featuredPopularTvShow?.name}
      />
    </div>
  ) : null;
}
