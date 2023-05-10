import { Suspense } from "react";
import { ITvOverview } from "../interfaces/ITvOverview";
import { ITvSeasonDetailed } from "../interfaces/ITvSeasonDetailed";
import { Loading } from "./Loading";
import { SeasonEpisodeList } from "./SeasonEpisodesList";
import { SeasonListOption } from "./SeasonListOption";
import { Section } from "./Section";

interface SeasonsProps {
  seasons: ITvOverview["seasons"];
  currentSeason?: ITvSeasonDetailed;
  loadingCurrentSeason: boolean;
  refetchCurrentSeason: (
    season_number: ITvSeasonDetailed["season_number"]
  ) => void;
}

export function Seasons({
  seasons,
  currentSeason,
  refetchCurrentSeason,
  loadingCurrentSeason,
}: SeasonsProps) {
  return (
    <Section title='Temporadas'>
      <div className='flex w-full items-start justify-start'>
        <Suspense fallback={<Loading />}>
          <div className='flex w-full flex-col rounded bg-neutral-900'>
            <SeasonListOption
              seasons={seasons}
              refetchCurrentSeason={refetchCurrentSeason}
            />
            <SeasonEpisodeList
              currentSeason={currentSeason}
              loadingCurrentSeason={loadingCurrentSeason}
            />
          </div>
        </Suspense>
      </div>
    </Section>
  );
}
