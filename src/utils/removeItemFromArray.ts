export function removeItemFromArray<T>(
  value: T,
  arr?: Array<T>
): Array<T> | void {
  if (arr) {
    const index = arr.indexOf(value);

    if (index > -1) {
      arr.splice(index, 1);
    }

    return arr;
  }
}
