import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { IRecommendedResult } from "../interfaces/IRecommended";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";
import { ErrorFetchContent } from "./ErrorFetchContent";
import { ListItem } from "./ListItem";
import { ScrollableComponent } from "./ScrollableComponent";
import { Section } from "./Section";

interface IRecommendedProps<T> {
  data: (T[] & IRecommendedResult[]) | IRecommendedResult[] | undefined;
  error?: IErrorFetchContent;
  mediaType: MediaTypes;
}

export function Recommended<T>({
  data,
  error,
  mediaType,
}: IRecommendedProps<T>) {
  return (
    <Section title={"Você também pode gostar"}>
      <ErrorFetchContent error={error}>
        {data && data.length > 0 ? (
          <div className='w-full h-list-md rounded'>
            <ScrollableComponent listSize={data?.length}>
              <ul className='h-full flex flex-row items-center' role='list'>
                {data.map((similarMovie, _) => {
                  return (
                    <ListItem
                      title={similarMovie.title || similarMovie.original_title}
                      poster_path={similarMovie.poster_path}
                      url={`/${mediaType}/${similarMovie.id}`}
                      key={similarMovie.id}
                    />
                  );
                })}
              </ul>
            </ScrollableComponent>
          </div>
        ) : null}
      </ErrorFetchContent>
    </Section>
  );
}
