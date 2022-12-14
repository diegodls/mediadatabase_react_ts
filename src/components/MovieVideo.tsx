import { IMovieVideoResults } from "../interfaces/IMovieVideos";

interface MovieVideoProps {
  data?: IMovieVideoResults;
}

export function MovieVideo({ data }: MovieVideoProps) {
  return (
    <div className='max-w-screen-lg'>
      <iframe
        title={`${data?.name}`}
        src={`https://www.youtube.com/embed/${data?.key}`}
        width='853'
        height='480'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        className='w-full h-auto aspect-video'
      ></iframe>
    </div>
  );
}
