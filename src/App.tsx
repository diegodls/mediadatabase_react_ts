import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { ErrorFallback } from "./components/ErrorFallback";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className='w-full h-full flex flex-col items-center'>
        <Header />
        <div className='max-w-CustomMaxWidth'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
