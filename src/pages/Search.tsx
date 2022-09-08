import { Link } from "react-router-dom";

export const Search = () => {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
      <h1>Search</h1>
      <nav>
        <Link to='/'>Voltar</Link>
      </nav>
      <Link to='/nothing'>404</Link>
    </div>
  );
};
