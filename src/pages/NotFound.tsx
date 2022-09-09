import { Link } from "react-router-dom";
export const NotFound = () => {
  return (
    <div className='h-full w-full flex items-center justify-center'>
      <p>Not Found</p>
      <nav className='h-full flex items-center justify-center '>
        <Link to='/' className='h-full flex items-center justify-center '>
          VOLTAR
        </Link>
      </nav>
    </div>
  );
};
