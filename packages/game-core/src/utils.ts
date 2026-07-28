export function popRandomValueFromArray<T>(array: Array<T>): [T, Array<T>] {
  if (array.length === 0) {
    throw Error("Array is empty");
  }

  const valueIndex = Math.floor(Math.random() * array.length);
  const value = array.splice(valueIndex, 1)[0];

  if (value === undefined) {
    throw Error("Picked value is undefined");
  }

  return [value, array];
}

export function popNRandomValuesFromArray<T>(
  n: number,
  array: Array<T>,
): [T[], Array<T>] {
  if (n > array.length) {
    throw Error("Cannot pick more values than array length");
  }

  const values: T[] = [];
  let arrayAcc = array;

  for (let i = 0; i < n; i++) {
    const [value, remainingArray] = popRandomValueFromArray(arrayAcc);
    values.push(value);
    arrayAcc = remainingArray;
  }

  return [values, arrayAcc];
}
