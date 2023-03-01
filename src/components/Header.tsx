import { useLocation } from "react-router-dom";
import { INavData } from "../interfaces/INavData";
import { CustomNavLink } from "./CustomNavLink";
import { SearchInput } from "./SearchInput";

export function Header() {
  const location = useLocation();
  console.log(location.pathname);

  const navData: INavData[] = [
    { title: "HOME", to: "/" },
    { title: "MOVIE", to: "/movie" },
    { title: "TV", to: "/tv" },
  ];

  return (
    <header
      className={`w-full h-headerHeight flex flex-row items-center justify-center absolute z-50 overflow-hidden transition-all`}
    >
      <div className='w-full h-full  max-w-CustomMaxWidth  px-2 flex items-center justify-between z-50'>
        <span className='max-w-[4em] sm:max-w-[7em] h-full flex items-center justify-center overflow-hidden'>
          {/* LOGO */}
        </span>
        <SearchInput />
      </div>

      <div className='h-full w-full flex flex-row items-center justify-center gap-5 absolute z-50'>
        <nav className='h-full flex items-center justify-center'>
          {navData.map((item, _) => (
            <CustomNavLink
              key={`${item.to + item.title}`}
              title={item.title}
              to={item.to}
              currentPath={location.pathname}
            />
          ))}
        </nav>
      </div>

      <div className='w-full h-12 top-0 bg-gradient-to-b from-customColors-background/80 absolute z-10' />
    </header>
  );
}
