import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";
import { IKeywords } from "../interfaces/IKeywords";
import { ErrorFetchContent } from "./ErrorFetchContent";
import { Section } from "./Section";

interface KeywordListProps {
  data?: IKeywords;
  error?: IErrorFetchContent;
}

export function KeywordList({ data, error }: KeywordListProps) {
  return (
    <Section title={"TAGS"}>
      <ErrorFetchContent error={error}>
        {data && data.keywords.length > 0 ? (
          <ul role='list' className='mt-4 flex flex-row gap-2 flex-wrap'>
            {data.keywords.slice(0, 5).map((keyword) => (
              <li
                key={keyword.id}
                title={keyword.name}
                aria-label={keyword.name}
                className='mb-1 p-1 px-3 flex bg-black/10 rounded-full border-2 border-customColors-red-500 cursor-pointer'
              >
                <p className='m-auto capitalize'>{keyword.name}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </ErrorFetchContent>
    </Section>
  );
}
