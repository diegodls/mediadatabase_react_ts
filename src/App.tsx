import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Details } from "./pages/Details";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Search } from "./pages/Search";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details' element={<Details />} />
        <Route path='/search' element={<Search />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
