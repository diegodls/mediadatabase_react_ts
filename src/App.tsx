import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { ErrorFallback } from "./components/ErrorFallback";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className='w-full min-w-[640px] max-w-[1366px] flex flex-col overflow-hidden'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
