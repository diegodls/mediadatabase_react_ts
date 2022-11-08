export function calcDynamicOpacity(index: number, length: number): string {
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

  const opacityList = [
    "opacity-0",
    "opacity-10",
    "opacity-20",
    "opacity-30",
    "opacity-40",
    "opacity-50",
    "opacity-60",
    "opacity-70",
    "opacity-80",
    "opacity-90",
    "opacity-100",
  ];

  return opacityList[Math.floor(finalOpacity)];
}
