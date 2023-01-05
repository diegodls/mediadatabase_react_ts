import { TiWarning } from "react-icons/ti";
import { IErrorFetchContent } from "../interfaces/IErrorFetchContent";

interface ErrorFetchContentFullProps {
  error?: IErrorFetchContent;
  children: React.ReactNode;
}

export function ErrorFetchContentFull({
  error,
  children,
}: ErrorFetchContentFullProps) {
  return (
    <>
      {error ? (
        <section
          className={`w-full h-full p-2 flex flex-col gap-2 items-center justify-center`}
        >
          <div className='text-[120px] text-customColors-red-500'>
            <TiWarning />
          </div>

          <p className='text-lg font-bold'>Oops... Algo deu errado!</p>
          <p className='text-neutral-400'>{error.status_message}</p>
          <p className='text-neutral-400'>Código: {error.status_code}</p>
        </section>
      ) : (
        children
      )}
    </>
  );
}
