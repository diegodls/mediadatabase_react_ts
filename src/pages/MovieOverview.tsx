import { useParams } from "react-router-dom";

export function MovieOverview() {
  let { movieId } = useParams();
  return (
    <div>
      <h1>MovieOverview</h1>
      <h2>MovieID: {movieId}</h2>
    </div>
  );
}
