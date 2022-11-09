import { calcDynamicOpacity } from "../utils/calcDynamicOpacity";

interface PopularMoviesListItemSkeletonProps {
  itemIndex: number;
  array: null[];
}

export function PopularMoviesListItemSkeleton({
  itemIndex,
  array,
}: PopularMoviesListItemSkeletonProps) {
  const dynamicOpacity = calcDynamicOpacity(itemIndex, array.length);

  return (
    <li
      className={`md:w-36 md:min-w-[9rem] h-full rounded-md bg-gray-600 overflow-hidden`}
      style={{ opacity: dynamicOpacity }}
    >
      <div className='animate-diagonalMove'>
        <div className='w-52 h-96 bg-gradient-to-r from-transparent via-slate-50/30 to-transparent transform rotate-45 translate-x-[-50%] translate-y-[-50%]' />
      </div>
    </li>
  );
}
