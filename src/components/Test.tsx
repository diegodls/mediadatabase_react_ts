import { NavLink } from "react-router-dom";
import { usePopular } from "../hooks/usePopular";
import { usePopularPerson } from "../hooks/usePopularPerson";
import { IPerson } from "../interfaces/IPerson";
import { IPopularTvShowsResults } from "../interfaces/IPopularTvShows";
import { API_BASEURL_IMAGE_200 } from "../utils/constants";
import { PopularPersonList } from "./PopularPersonList";
import { ScrollableComponent } from "./ScrollableComponent";

export function Test() {
  const {
    slicedPersonList: personList,
    featuredPerson,
    dataError: popularPersonListError,
    featuredPersonDetails,
    loadingData: loadingPopularPersonList,
  } = usePopularPerson(`person/popular`);

  const {
    popularFeaturedItem,
    popularDataWithoutFeaturedItem,
    popularDataError,
    loadingPopularData,
  } = usePopular<IPopularTvShowsResults>("tv");

  return (
    <>
      <div className='w-full mt-headerHeight bg-slate-700 text-white'>
        <p>
          popularFeaturedItem.name: {popularFeaturedItem?.name} -
          popularFeaturedItem.backdrop_path:{" "}
          {popularFeaturedItem?.backdrop_path}
        </p>
        <p>
          popularDataWithoutFeaturedItem:{" "}
          {popularDataWithoutFeaturedItem?.length}
        </p>
        <p>popularDataError: {popularDataError?.status_message}</p>
        <p>
          loadingPopularData:{" "}
          {loadingPopularData ? "Carregando" : "Não Carregando"}
        </p>
      </div>
      <div className='w-full mt-12 bg-sky-400'>
        {personList && personList?.length > 0 && !loadingPopularPersonList ? (
          <ScrollableComponent listSize={personList?.length}>
            <ul
              className='h-list-sm flex flex-row items-center bg-yellow-500'
              role='list'
            >
              {personList?.map((person: IPerson, index) => (
                <li
                  key={person.id}
                  className='min-w-fit h-full flex flex-col bg-emerald-500'
                  title={person.name}
                  aria-label={`Imagem da capa do filme ${person.name} - Clique para visitar`}
                >
                  <NavLink
                    to={person.name || "#"}
                    end
                    className='group h-full bg-red-500 flex rounded-md cursor-pointer border-2 border-transparent relative overflow-hidden transform transition-all scale-90 hover:scale-100 hover:drop-shadow-xl hover:z-10 focus-visible:scale-100 focus-visible:drop-shadow-xl focus-visible:outline-none focus-visible:ring-0 focus-visible:border-2 focus-visible:border-customColors-red-500'
                  >
                    {person.name ? (
                      <div className='w-full h-12 flex flex-col justify-end absolute z-20 bottom-0 translate-y-12 transition-all ease-in opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100'>
                        {person.name ? (
                          <p className='font-bold pl-1 z-20 line-clamp-1 overflow-hidden scale-90 relative bottom-1'>
                            {person.name}
                          </p>
                        ) : null}

                        {person.name ? (
                          <p className='font-bold pl-2 z-20 line-clamp-1 overflow-hidden scale-90 relative bottom-2'>
                            as {person.name}
                          </p>
                        ) : null}

                        <span className='w-full h-24 bg-gradient-to-t from-black absolute z-10' />
                      </div>
                    ) : null}

                    <img
                      src={
                        person.profile_path
                          ? API_BASEURL_IMAGE_200 + person.profile_path
                          : "https://cdn.w600.comps.canstockphoto.com.br/projetos-poster-glitched-tipogr%C3%A1fico-vetor-clip-arte_csp40896763.jpg"
                      }
                      className='h-full min-w-fit'
                      loading='lazy'
                    />
                  </NavLink>
                </li>
              ))}
            </ul>
          </ScrollableComponent>
        ) : null}
      </div>

      <PopularPersonList
        personList={personList}
        loadingPersonDetails={loadingPopularPersonList}
      />
    </>
  );
}
