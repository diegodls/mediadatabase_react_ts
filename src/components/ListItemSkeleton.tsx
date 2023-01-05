import { calcDynamicOpacity } from "../utils/calcDynamicOpacity";

interface ListItemSkeletonProps {
  itemIndex: number;
  array: null[];
}

export function ListItemSkeleton({ itemIndex, array }: ListItemSkeletonProps) {
  const dynamicOpacity = calcDynamicOpacity(itemIndex, array.length);

  return (
    <li
      className={`md:w-40 w-28 flex-none h-full scale-90 rounded-md bg-gray-600 overflow-hidden`}
      style={{ opacity: dynamicOpacity }}
    >
      <div className='animate-diagonalMove'>
        <div className='w-52 h-96 bg-gradient-to-r from-transparent via-slate-50/30 to-transparent transform rotate-45 translate-x-[-50%] translate-y-[-50%]' />
      </div>
    </li>
  );
}
