import { NavLink } from "react-router-dom";
import { IPerson } from "../interfaces/IPerson";
import { IPersonDetails } from "../interfaces/IPersonDetails";
import { ListItem } from "./ListItem";
import { ScrollableComponent } from "./ScrollableComponent";

interface PopularPersonDescriptionProps {
  featuredPerson: IPerson | undefined;
  featuredPersonDetails: IPersonDetails | undefined;
}
export function PopularPersonDescription({
  featuredPerson,
  featuredPersonDetails,
}: PopularPersonDescriptionProps) {
  return (
    <div className='w-full h-full p-2 gap-1 flex flex-col relative'>
      <div className='sm:flex sm:items-end transition-all'>
        <h1 className='font-bold text-2xl sm:text-2xl whitespace-nowrap'>
          {featuredPerson?.name}
        </h1>
        <p className='text-sm sm:ml-layoutX'>
          {featuredPersonDetails?.birthday}
        </p>
      </div>

      <div className='line-clamp-3'>
        <p className=''>{featuredPersonDetails?.biography}</p>
      </div>

      <div className='w-full h-full max-h-list-md sm:flex sm:items-center sm:justify-center hidden'>
        {featuredPerson && featuredPerson?.known_for.length > 0 ? (
          <ScrollableComponent
            listSize={featuredPerson?.known_for.length}
            center={false}
          >
            <ul className='h-full flex flex-row items-center' role='list'>
              {featuredPerson?.known_for.map((item) =>
                item.backdrop_path ? (
                  <ListItem
                    key={`${item.id}-${item.name}`}
                    url={`${item.media_type}/${item.id}`}
                    poster_path={item.poster_path}
                    title={
                      item.title ||
                      item.original_title ||
                      item.original_name ||
                      item.name
                    }
                  />
                ) : null
              )}
            </ul>
          </ScrollableComponent>
        ) : null}
      </div>
      <div className='flex items-end justify-end m-2 absolute right-0 bottom-0'>
        <NavLink
          to={`person/${featuredPerson?.id}`}
          className='w-fit flex items-center justify-center px-2 bg-customColors-red-500 rounded relative self-end justify-self-end hover:bg-red-600 hover:text-neutral-300 drop-shadow-lg shadow-customColors-red-500 transition-all'
        >
          <p className='p-1 min-h-fit m-auto font-bold'>Leia Mais</p>
        </NavLink>
      </div>
    </div>
  );
}
