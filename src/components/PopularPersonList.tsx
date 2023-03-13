import { IPerson } from "../interfaces/IPerson";

import { ListItem } from "./ListItem";
import { ScrollableComponent } from "./ScrollableComponent";

interface PopularPersonListProps {
  personList: IPerson[] | undefined;
}

console.log("RENDER - PopularPersonList.tsx");

export function PopularPersonList({ personList }: PopularPersonListProps) {
  return (
    <div className={`w-full mt-2 bg-emerald-400`}>
      <p className='p-3 bg-yellow-500 font-bold text-black absolute'>
        {personList?.length} - {personList && personList[0].name}
      </p>
      {personList && personList?.length > 0 ? (
        <ScrollableComponent listSize={personList?.length}>
          <ul
            className='h-full flex flex-row items-center bg-sky-500'
            role='list'
          >
            {personList?.map((person: IPerson) => (
              <ListItem
                key={person.id}
                url={`person/${person.id}`}
                poster_path={person.profile_path}
                title={person.name}
              />
            ))}
          </ul>
        </ScrollableComponent>
      ) : null}
    </div>
  );
}
