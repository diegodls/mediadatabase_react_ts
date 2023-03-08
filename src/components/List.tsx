import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { MediaTypes } from "../types/sharedTypes/MediaTypes";
import { ErrorFetchContent } from "./ErrorFetchContent";
import { ListItem } from "./ListItem";
import { ListItemSkeleton } from "./ListItemSkeleton";
import { ScrollableComponent } from "./ScrollableComponent";
import { Section } from "./Section";

interface IListRowProps<T> {
  data: T[] | undefined;
  type?: MediaTypes;
  title?: string;
  error?: IErrorFetchContent;
  titleBg?: boolean;
}

interface IMock {
  id: number;
  title?: string;
  character?: string | null;
  name?: string;
  poster_path?: string;
  profile_path?: string | null;
}

export function List<T>({
  data,
  type,
  title,
  error,
  titleBg,
}: IListRowProps<T & IMock>) {
  return (
    <Section title={title} titleBg={titleBg}>
      <ErrorFetchContent error={error}>
        {data && data?.length > 0 ? (
          <div className='w-full h-list-md rounded'>
            <ScrollableComponent listSize={data?.length}>
              <ul className='h-full flex flex-row items-center' role='list'>
                {data?.map((item) => {
                  return (
                    <ListItem
                      title={item.title || item.name}
                      character={item.character ? item.character : null}
                      poster_path={item.poster_path || item.profile_path}
                      key={`${item.id}${item.name ? "-" + item.name : ""}${
                        item.character ? "-" + item.character : ""
                      }`}
                      url={`/${type}/${item.id}`}
                    />
                  );
                })}
              </ul>
            </ScrollableComponent>
          </div>
        ) : (
          <div className='w-full h-48 md:h-64 flex flex-col relative'>
            <ul
              className='w-full h-full px-10 flex flex-row items-center relative overflow-hidden'
              role='list'
            >
              {Array(6)
                .fill(null)
                .map((_, itemIndex, array) => (
                  <ListItemSkeleton
                    key={itemIndex}
                    itemIndex={itemIndex}
                    array={array}
                  />
                ))}
            </ul>
          </div>
        )}
      </ErrorFetchContent>
    </Section>
  );
}
