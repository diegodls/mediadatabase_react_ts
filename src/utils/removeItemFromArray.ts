export function removeItemFromArray<T>(
  item: T,
  arr?: Array<T>
): Array<T> | undefined {
  if (arr) {
    const index = arr.indexOf(item);

    if (index > -1) {
      arr.splice(index, 1);
    }

    return arr;
  }
}
