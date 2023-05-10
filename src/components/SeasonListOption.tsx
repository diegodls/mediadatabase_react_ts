import { ITvOverview, Season } from "../interfaces/ITvOverview";
import { ITvSeasonDetailed } from "../interfaces/ITvSeasonDetailed";
import { ScrollableComponent } from "./ScrollableComponent";

interface SeasonListOptionProps {
  seasons: ITvOverview["seasons"];
  refetchCurrentSeason: (
    season_number: ITvSeasonDetailed["season_number"]
  ) => void;
}
export function SeasonListOption({
  seasons,
  refetchCurrentSeason,
}: SeasonListOptionProps) {
  function setSeasonNumber(season_number: ITvSeasonDetailed["season_number"]) {
    if (season_number && season_number > 0) {
      refetchCurrentSeason(season_number);
    }
  }

  function shouldShowButton(season: Season): boolean {
    const currentTime = new Date().getTime();
    const seasonTime = new Date(season.air_date).getTime();

    if (currentTime <= seasonTime) {
      return false;
    }

    if (season.name.toLocaleLowerCase() === "especiais") {
      return false;
    }

    return true;
  }

  return (
    <ScrollableComponent center={false}>
      <div className='flex w-full flex-row gap-2'>
        {seasons.map((season) => {
          if (shouldShowButton(season)) {
            return (
              <button
                key={season.id}
                onClick={() => {
                  setSeasonNumber(season.season_number);
                }}
                className='min-w-auto flex items-center justify-center rounded bg-customColors-red-500 py-1 px-2'
              >
                <p className='flex-nowrap whitespace-nowrap'>{season.name}</p>
              </button>
            );
          }
        })}
      </div>
    </ScrollableComponent>
  );
}
