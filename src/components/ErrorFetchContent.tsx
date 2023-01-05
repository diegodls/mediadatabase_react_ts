import { TiWarning } from "react-icons/ti";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";

interface ErrorFetchContentProps {
  error?: IErrorFetchContent;
  children: React.ReactNode;
}

export function ErrorFetchContent({ error, children }: ErrorFetchContentProps) {
  return (
    <>
      {error ? (
        <section className='w-full max-h-28 p-2 flex gap-2 items-center rounded border-l-8 border-customColors-red-500 bg-neutral-900'>
          <div className='text-[80px] text-customColors-red-500'>
            <TiWarning />
          </div>
          <div>
            <p className='text-lg font-bold'>Oops... Algo deu errado!</p>
            <p className='text-neutral-400'>{error.status_message}</p>
            <p className='text-neutral-400'>Código: {error.status_code}</p>
          </div>
        </section>
      ) : (
        children
      )}
    </>
  );
}
