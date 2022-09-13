import { useTrendingMovieAndSeries } from "../hooks/useTrendingMovieAndSeries";

export function TrendingMovieAndSeries() {
  const { trendingMovieAndSeries } = useTrendingMovieAndSeries();
  return (
    <div>
      <h1>TrendingMovieAndSeries</h1>
      <p>
        {trendingMovieAndSeries
          ? `Data: ${trendingMovieAndSeries[0].title}`
          : "Sem trending"}
      </p>
    </div>
  );
}
