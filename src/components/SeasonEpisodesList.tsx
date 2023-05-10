import { ITvSeasonDetailed } from "../interfaces/ITvSeasonDetailed";
import { Loading } from "./Loading";
import { SeasonEpisodeListItem } from "./SeasonEpisodesListItem";

interface SeasonEpisodeListProps {
  currentSeason?: ITvSeasonDetailed;
  loadingCurrentSeason: boolean;
}

export function SeasonEpisodeList({
  currentSeason,
  loadingCurrentSeason,
}: SeasonEpisodeListProps) {
  return (
    <div
      className={`mt-2 h-[400px] rounded  ${
        loadingCurrentSeason
          ? "overflow-hidden"
          : "overflow-auto scrollbar- scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-500 hover:scrollbar-thumb-zinc-700 scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
      }`}
    >
      {loadingCurrentSeason ? (
        <Loading onTop={false} h_full={true} />
      ) : (
        <ul className='flex flex-col gap-2 rounded overflow-hidden'>
          {currentSeason && currentSeason.episodes.length > 0
            ? currentSeason.episodes.map((episode) => (
                <SeasonEpisodeListItem key={episode.id} episode={episode} />
              ))
            : "Sem informações da temporada"}
        </ul>
      )}
    </div>
  );
}
