import { usePopularTvShows } from "../hooks/usePopularTvShows";
import { API_BASEURL_IMAGE_1280 } from "../utils/constants";

export function PopularTvShow() {
  const { featuredPopularTvShow } = usePopularTvShows();

  return featuredPopularTvShow ? (
    <div className='w-full relative overflow-hidden bg-red-500'>
      <img
        className='min-w-full flex-shrink-0 select-none bg-cover'
        src={API_BASEURL_IMAGE_1280 + featuredPopularTvShow?.backdrop_path}
        alt={featuredPopularTvShow?.name}
        title={featuredPopularTvShow?.name}
      />
    </div>
  ) : null;
}
