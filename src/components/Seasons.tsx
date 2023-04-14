import { Suspense } from "react";
import { ITvOverview } from "../interfaces/ITvOverview";
import { ITvSeasonDetailed } from "../interfaces/ITvSeasonDetailed";
import { Loading } from "./Loading";
import { ScrollableComponent } from "./ScrollableComponent";
import { SeasonEpisodeList } from "./SeasonEpisodesList";
import { Section } from "./Section";

interface SeasonsProps {
  seasons: ITvOverview["seasons"];
  currentSeason?: ITvSeasonDetailed;
  refetchCurrentSeason: (
    season_number: ITvSeasonDetailed["season_number"]
  ) => void;
}

export function Seasons({
  seasons,
  currentSeason,
  refetchCurrentSeason,
}: SeasonsProps) {
  function setSeasonNumber(season_number: ITvSeasonDetailed["season_number"]) {
    if (season_number && season_number > 0) {
      refetchCurrentSeason(season_number);
    }
  }

  return (
    <Section title='Temporadas'>
      <div className='w-full flex justify-start items-start'>
        <Suspense fallback={<Loading />}>
          <div className='w-full flex flex-col bg-neutral-900 rounded'>
            <ScrollableComponent center={false}>
              <div className='w-full flex flex-row gap-2'>
                {seasons.map((season) => (
                  <button
                    key={season.id}
                    onClick={() => {
                      setSeasonNumber(season.season_number);
                    }}
                    className='min-w-auto flex items-center justify-center py-1 px-2 bg-customColors-red-500 rounded'
                  >
                    <p className='whitespace-nowrap flex-nowrap'>
                      {season.name}
                    </p>
                  </button>
                ))}
              </div>
            </ScrollableComponent>
            <SeasonEpisodeList currentSeason={currentSeason} />
          </div>
        </Suspense>
      </div>
    </Section>
  );
}
