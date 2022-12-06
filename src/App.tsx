import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorFallback } from "./components/ErrorFallback";
import { Header } from "./components/Header";
import { Details } from "./pages/Details";
import { Home } from "./pages/Home";
import { MovieOverview } from "./pages/MovieOverview";
import { NotFound } from "./pages/NotFound";
import { Search } from "./pages/Search";

export function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/details' element={<Details />} />
          <Route path='/search' element={<Search />} />
          <Route path='/movie/:movieId' element={<MovieOverview />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
