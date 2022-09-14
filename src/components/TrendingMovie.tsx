import { useTrendingMovies } from "../hooks/useTrendingMovies";

export function TrendingMovie() {
  const { trendingMovies } = useTrendingMovies();
  return (
    <div>
      <h1>TrendingMovie</h1>
      <p>
        {trendingMovies ? `Data: ${trendingMovies[0].title}` : "Sem trending"}
      </p>
    </div>
  );
}
