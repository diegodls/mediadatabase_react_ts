import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { ErrorFallback } from "./components/ErrorFallback";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className='w-full h-screen flex flex-col items-center'>
        <Header />
        <div className='w-full max-w-CustomMaxWidth flex-1'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
