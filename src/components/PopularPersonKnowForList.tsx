import { IPerson } from "../interfaces/IPerson";

import { ListItem } from "./ListItem";
import { ScrollableComponent } from "./ScrollableComponent";

interface PopularPersonKnowListProps {
  personList: IPerson[] | undefined;
}

export function PopularPersonKnowList({
  personList,
}: PopularPersonKnowListProps) {
  return (
    <div className='w-full h-list-md mt-2'>
      <ScrollableComponent>
        <ul className='h-full flex flex-row items-center'>
          {personList?.map((person: IPerson) => (
            <ListItem
              key={person.id}
              title={person.name}
              poster_path={person.profile_path}
              url={`/person/${person.id}`}
            />
          ))}
        </ul>
      </ScrollableComponent>
    </div>
  );
}
