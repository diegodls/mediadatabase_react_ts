import { useLocation } from "react-router-dom";
import { INavData } from "../interfaces/INavData";
import { CustomNavLink } from "./CustomNavLink";
import { SearchInput } from "./SearchInput";

export function Header() {
  const location = useLocation();

  const navData: INavData[] = [
    { title: "HOME", to: "/" },
    { title: "MOVIE", to: "/movie" },
    { title: "TV", to: "/tv" },
  ];

  return (
    <header className='w-full h-headerHeight px-layoutX flex flex-row items-center absolute z-50 overflow-hidden transition-all'>
      <span className='w-80 max-w-[4em] sm:max-w-[7em] h-full flex items-center justify-center overflow-hidden bg-yellow-700'>
        {/* LOGO */}
      </span>

      <nav className='h-full flex justify-center ml-auto mr-auto left-0 right-0 text-center absolute'>
        {navData.map((item, _) => (
          <CustomNavLink
            key={`${item.to + item.title}`}
            title={item.title}
            to={item.to}
            currentPath={location.pathname}
          />
        ))}
      </nav>

      <div className='mr-layoutX right-0 absolute'>
        <SearchInput />
      </div>

      <div className='w-full h-12 top-0 bg-gradient-to-b from-customColors-background/80 absolute -z-10' />
    </header>
  );
}
