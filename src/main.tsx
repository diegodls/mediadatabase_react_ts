import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { App } from "./App";
import { Test } from "./components/Test";
import "./main.css";
import { Details } from "./pages/Details";
import { Home } from "./pages/Home";
import { MovieOverview } from "./pages/MovieOverview";
import { NotFound } from "./pages/NotFound";
import { Search } from "./pages/Search";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='/details' element={<Details />} />
      <Route path='/search' element={<Search />} />
      <Route path='/movie/:movieId' element={<MovieOverview />} />
      <Route path='/tests' element={<Test />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
