export function calcDynamicOpacity(index: number, length: number): number {
  const minOpacity: number = 1;
  const maxOpacity: number = 6; //max = 10 (opacity: 1)

  let opacityInterval = (maxOpacity - minOpacity) / (length - 1);

  let finalOpacity = maxOpacity - opacityInterval * index;

  if (minOpacity >= maxOpacity) {
    finalOpacity = maxOpacity;
  }

  if (length <= 1) {
    finalOpacity = maxOpacity;
  }

  return Math.floor(finalOpacity) / 10;
}
