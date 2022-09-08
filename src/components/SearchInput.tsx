import { MagnifyingGlass } from "phosphor-react";

export function SearchInput() {
  return (
    <>
      <div className='w-28 h-full flex items-center justify-end bg-fuchsia-500 md:hidden'>
        <a href='/search'>
          <MagnifyingGlass size={20} weight='bold' />
        </a>
      </div>

      <div className='w-28 h-full md:flex flex-row items-center justify-end bg-violet-700 hidden'>
        <input
          type='text'
          placeholder='Search'
          className='border-none rounded bg-slate-400/25 placeholder:text-white'
        />
        <MagnifyingGlass size={20} weight='bold' />
      </div>
    </>
  );
}
