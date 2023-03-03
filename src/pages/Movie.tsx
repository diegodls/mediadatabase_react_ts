import { useEffect } from "react";

export function Movie() {
  useEffect(() => {
    document.title = `MDB - Filmes`;
  }, []);

  return (
    <div className='w-full mt-headerHeight bg-emerald-300'>
      <h1>Movie</h1>
    </div>
  );
}
