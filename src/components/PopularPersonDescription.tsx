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
    <div className='w-full h-full p-2 flex flex-col justify-between overflow-hidden relative'>
      <div className=''>
        <h1 className='font-bold text-xl sm:text-2xl md:text-3xl'>
          {featuredPerson?.name}
        </h1>
        <p>{featuredPersonDetails?.birthday}</p>
      </div>

      <div className=''>
        <p className='line-clamp-3'>{featuredPersonDetails?.biography}</p>
      </div>

      <div className='w-full max-h-list-md hidden sm:flex sm:flex-col overflow-hidden'>
        <ScrollableComponent>
          <ul role='list' className='h-full flex flex-row items-center'>
            {featuredPerson?.known_for.map((item) =>
              item.backdrop_path ? (
                <ListItem
                  key={item.id}
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
      </div>
      <div className='w-full grow md:grow-0 flex items-end justify-end'>
        <NavLink
          to={`person/${featuredPerson?.id}`}
          className='w-fit flex items-center justify-center px-2 bg-customColors-red-500 rounded relative self-end justify-self-end hover:bg-red-600 hover:text-neutral-300 
                  drop-shadow-lg shadow-customColors-red-500 transition-all'
        >
          <p className='p-1 min-h-fit m-auto font-bold'>Leia Mais</p>
        </NavLink>
      </div>
    </div>
  );
}
