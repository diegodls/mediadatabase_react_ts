import { ITvSeasonDetailed } from "../interfaces/ITvSeasonDetailed";
import { SeasonEpisodeListItem } from "./SeasonEpisodesListItem";

interface SeasonEpisodeListProps {
  currentSeason?: ITvSeasonDetailed;
}

export function SeasonEpisodeList({ currentSeason }: SeasonEpisodeListProps) {
  return (
    <div className='max-h-[500px] mt-2 overflow-auto scrollbar-thumb-zinc-500 hover:scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin'>
      <ul className='flex flex-col gap-2 '>
        {currentSeason && currentSeason.episodes.length > 0
          ? currentSeason.episodes.map((episode) => (
              <SeasonEpisodeListItem key={episode.id} episode={episode} />
            ))
          : "Sem informações da temporada"}
      </ul>
    </div>
  );
}
