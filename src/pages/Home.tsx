import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ITitleOverview } from "../interfaces/interface";
import { getOverview } from "../services/api";

export const Home = () => {
  const [apiData, setApiData] = useState<ITitleOverview>();

  async function fetchOverview() {
    const data = await getOverview("tt0944947");
    if (data) {
      setApiData(data);
      console.log("tem data");

      console.log(data);
    }
  }

  useEffect(() => {
    fetchOverview();
  }, []);

  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
      <p className='text-7xl'>Home</p>
      <Link to='/details'>Detalhes</Link>
      <Link to='/nothing'>404</Link>
      <p>{apiData ? `Data: ${apiData.title.title}` : "Sem data"}</p>
    </div>
  );
};
