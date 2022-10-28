interface PopularMoviesListItemSkeletonProps {
  itemIndex: number;
  array: null[];
}

export function PopularMoviesListItemSkeleton({
  itemIndex,
  array,
}: PopularMoviesListItemSkeletonProps) {
  function calcOpacity(index: number, length: number) {
    const minOpacity: number = 10;
    const maxOpacity: number = 50;

    if (minOpacity >= maxOpacity) {
      return maxOpacity;
    }

    const opacityInterval = (maxOpacity - minOpacity) / (length - 1);
    const finalOpacity =
      (minOpacity + opacityInterval * (length - 1 - index)) / 100; //remover o "length -1" para mudar a ordem
    return finalOpacity.toFixed(1);
  }

  return (
    <li
      className={`w-48 h-full rounded-md 
                bg-slate-500 opacity-[${calcOpacity(
                  itemIndex,
                  array.length
                )}] overflow-hidden`}
    >
      <h1>{calcOpacity(itemIndex, array.length)}</h1>
      <div className=' h-64 animate-diagonalMove'>
        <div className='w-12 h-[500px] bg-gradient-to-r from-transparent via-stone-800/90 to-transparent transform rotate-45 translate-y-[-250px]' />
      </div>
    </li>
  );
}
