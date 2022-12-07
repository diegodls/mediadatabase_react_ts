import { NavLink } from "react-router-dom";
import { SearchInput } from "./SearchInput";

export function Header() {
  function CustomNavLink(name: string, path: string) {
    return (
      <NavLink
        to={path}
        className={({ isActive }) => {
          return `h-full flex items-center justify-center px-2 hover:bg-customColors-red-500 ${
            isActive
              ? "border-b-2 border-customColors-red-500 bg-slate-400/25"
              : ""
          }`;
        }}
      >
        {name}
      </NavLink>
    );
  }

  return (
    <header
      className={`w-full min-w-[640px] h-10 flex flex-row items-center justify-center absolute z-50 overflow-hidden transition-all`}
    >
      <div className='w-full h-full px-2 flex items-center justify-between z-50'>
        <span className='max-w-[4em] sm:max-w-[7em] h-full flex items-center justify-center overflow-hidden'>
          {/* LOGO */}
        </span>
        <SearchInput />
      </div>

      <div className='h-full w-full flex flex-row items-center justify-center gap-5 absolute z-50'>
        <nav className='h-full flex items-center justify-center'>
          {CustomNavLink("HOME", "/")}
          {CustomNavLink("MOVIES", "/movies")}
          {CustomNavLink("SERIES", "/series")}
        </nav>
      </div>

      <div className='w-full h-12 top-0 bg-gradient-to-b from-customColors-background/80 absolute z-10' />
    </header>
  );
}
