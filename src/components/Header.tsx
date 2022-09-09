import { Link } from "react-router-dom";
import { SearchInput } from "./SearchInput";

export function Header() {
  return (
    <header className='w-full h-10 flex flex-row items-center justify-between'>
      <div className='w-28 h-full px-2 flex items-center justify-center'>
        <p>LOGO</p>
      </div>
      <div className='h-full pr-20 md:pl-28 md:pr-0 sm:pr-20 flex flex-row items-center justify-center gap-5'>
        <nav className='h-full flex items-center justify-center'>
          <Link to='/' className='h-full flex items-center justify-center px-2'>
            HOME
          </Link>
        </nav>
        <nav className='h-full flex items-center justify-center'>
          <Link
            to='/movies'
            className='h-full flex items-center justify-center px-2'
          >
            MOVIES
          </Link>
        </nav>
        <nav className='h-full flex items-center justify-center'>
          <Link
            to='/series'
            className='h-full flex items-center justify-center px-2'
          >
            SERIES
          </Link>
        </nav>
      </div>
      <SearchInput />
    </header>
  );
}
