import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Test } from "./components/Test";
import "./main.css";
import { Details } from "./pages/Details";
import { Home } from "./pages/Home";
import { Movie } from "./pages/Movie";
import { MovieOverview } from "./pages/MovieOverview";
import { NotFound } from "./pages/NotFound";
import { Search } from "./pages/Search";
import { Tv } from "./pages/Tv";
import { TvOverview } from "./pages/TvOverview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/details", element: <Details /> },
      { path: "/search", element: <Search /> },
      { path: "/movie", element: <Movie /> },
      { path: "/movie/:movieId", element: <MovieOverview /> },
      { path: "/tv", element: <Tv /> },
      { path: "/tv/:tvID", element: <TvOverview /> },
      { path: "/tests", element: <Test /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
