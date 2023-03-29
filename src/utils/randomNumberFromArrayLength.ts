export function randomNumberFromArrayLength<T>(array: T[]) {
  return Math.floor(Math.random() * array.length);
}
