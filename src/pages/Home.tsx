import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { ITitleOverview } from "../interfaces/interface";
import { getOverview } from "../services/api";

export function Home() {
  const [apiData, setApiData] = useState<ITitleOverview>();

  const [loadingData, setLoadingData] = useState<boolean>(false);

  async function fetchOverview() {
    setLoadingData(true);
    const data = await getOverview("tt0944947");
    if (data) {
      setApiData(data);
    }
    setLoadingData(false);
  }
  useEffect(() => {
    fetchOverview();
  }, []);

  return (
    <div className='h-full w-full flex flex-col'>
      <Header />
      <Loading show={loadingData} />
      <p className='text-7xl'>Home</p>
      <Link to='/details'>Detalhes</Link>
      <Link to='/nothing'>404</Link>
      <p>{apiData ? `Data: ${apiData.title.title}` : "Sem data"}</p>
    </div>
  );
}
