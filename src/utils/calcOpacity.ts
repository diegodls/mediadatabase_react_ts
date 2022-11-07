export function calcOpacity(index: number, length: number): string {
  const minOpacity: number = 1;
  const maxOpacity: number = 6;

  let opacityInterval = (maxOpacity - minOpacity) / (length - 1);

  let finalOpacity = maxOpacity - opacityInterval * index;

  if (minOpacity >= maxOpacity) {
    finalOpacity = maxOpacity;
  }

  if (length <= 1) {
    finalOpacity = maxOpacity;
  }

  switch (Math.floor(finalOpacity).toFixed(0)) {
    case "10":
      return "100";
    case "9":
      return "90";
    case "8":
      return "80";
    case "7":
      return "70";
    case "6":
      return "60";
    case "5":
      return "50";
    case "4":
      return "40";
    case "3":
      return "30";
    case "2":
      return "20";
    case "1":
      return "10";
    case "0":
      return "0";
    default:
      return "0";
  }
  //return `opacity-[.${finalOpacity.toFixed(0)}]`;
}
