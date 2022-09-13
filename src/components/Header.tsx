import { Link, NavLink } from "react-router-dom";
import { SearchInput } from "./SearchInput";

export function Header() {
  function CustomNavLink(name: string, path: string) {
    return (
      <>
        <nav className='h-full flex items-center justify-center'>
          <NavLink
            to={path}
            className={({ isActive }) => {
              return `h-full flex items-center justify-center px-2 hover:bg-green-500 ${
                isActive ? "border-b-2 border-red-600 bg-slate-400/25" : ""
              }`;
            }}
          >
            {name}
          </NavLink>
        </nav>
      </>
    );
  }

  return (
    <header className='w-full h-10 flex flex-row items-center justify-between fixed'>
      <div className='w-28 min-w-max h-full px-2 flex items-center justify-center'>
        <p>LOGO</p>
      </div>
      <div className='h-full mr-20 md:ml-28 md:mr-0 sm:mr-20 flex flex-row items-center justify-center gap-5'>
        {CustomNavLink("HOME", "/")}
        {CustomNavLink("MOVIES", "/movies")}
        {CustomNavLink("SERIES", "/series")}
      </div>
      <SearchInput />
    </header>
  );
}
