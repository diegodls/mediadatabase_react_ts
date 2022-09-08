import { Link } from "react-router-dom";

export const Details = () => {
  return (
    <div className='h-full w-full flex items-center justify-center'>
      <nav>
        <Link to='/'>Voltar</Link>
      </nav>
      <Link to='/nothing'>404</Link>
    </div>
  );
};
