import { MagnifyingGlass } from "phosphor-react";
import { SearchInput } from "./SearchInput";

export function Header() {
  return (
    <div className='w-full h-9 bg-green-500 flex flex-row items-center justify-around px-3'>
      <div className='w-28 h-full flex items-center justify-center bg-blue-500 lg:bg-amber-400'>
        <p>LOGO</p>
      </div>
      <div className='w-full h-9 flex flex-row items-center justify-center gap-5 bg-red-600'>
        <p>HOME</p>
        <p>SERIES</p>
        <p>MOVIES</p>
      </div>
      <SearchInput />
    </div>
  );
}
