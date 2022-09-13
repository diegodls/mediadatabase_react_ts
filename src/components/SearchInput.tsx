import { MagnifyingGlass } from "phosphor-react";
import { Link } from "react-router-dom";

export function SearchInput() {
  return (
    <div className='md:w-auto h-full flex items-center justify-center'>
      <Link
        to='/search'
        title='Search'
        className='px-1 h-full flex items-center md:hidden'
      >
        <MagnifyingGlass size={20} weight='bold' />
      </Link>

      <div className='border-none rounded bg-slate-400/25 p-1 px-2 md:flex flex-row items-center justify-center hidden'>
        <input
          type='text'
          placeholder='Search'
          className='p-0 h-full bg-transparent border-none placeholder:text-gray-400'
        />
        <MagnifyingGlass size={18} weight='bold' />
      </div>
    </div>
  );
}
