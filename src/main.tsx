import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";
import "./main.css";
import { Details } from "./pages/Details";
import { Home } from "./pages/Home";
import { MovieOverview } from "./pages/MovieOverview";
import { NotFound } from "./pages/NotFound";
import { Search } from "./pages/Search";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/details", element: <Details /> },
      { path: "/search", element: <Search /> },
      { path: "/movie/:movieId", element: <MovieOverview /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
