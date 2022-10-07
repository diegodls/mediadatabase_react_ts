import { NavLink } from "react-router-dom";
import { SearchInput } from "./SearchInput";

export function Header() {
  function CustomNavLink(name: string, path: string) {
    return (
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
    );
  }

  return (
    <header className='w-full h-10 flex flex-row items-center justify-center absolute z-50 overflow-hidden '>
      <div className='w-full h-full px-2 flex items-center justify-between'>
        <span className='max-w-[4em] sm:max-w-[7em] h-full flex items-center justify-center overflow-hidden'>
          LOGO
        </span>
        <SearchInput />
      </div>

      <div className='h-full w-full flex flex-row items-center justify-center gap-5 absolute'>
        <nav className='h-full flex items-center justify-center'>
          {CustomNavLink("HOME", "/")}
          {CustomNavLink("MOVIES", "/movies")}
          {CustomNavLink("SERIES", "/series")}
        </nav>
      </div>
    </header>
  );
}
