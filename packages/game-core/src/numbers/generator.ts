import { popNRandomValuesFromArray } from "../utils";

const SMALL_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const SMALL_NUMBERS_POOL = [...SMALL_NUMBERS, ...SMALL_NUMBERS];
const BIG_NUMBERS = [25, 50, 75, 100];
const BIG_NUMBERS_POOL = [...BIG_NUMBERS];

const MIN_TARGET = 100; // inclusive
const MAX_TARGET = 1000; // exclusive (max pick is 999)

const NUMBER_COUNT = 6;

function generateTargetNumber(): number {
  return Math.floor(Math.random() * (MAX_TARGET - MIN_TARGET)) + MIN_TARGET;
}

export function generateNumbersGame(
  bigNumberCount: number = 2,
): [number[], number] {
  if (
    bigNumberCount > NUMBER_COUNT ||
    bigNumberCount > BIG_NUMBERS_POOL.length
  ) {
    throw Error("Big number count is too large");
  }

  const [bigNumbers] = popNRandomValuesFromArray(
    NUMBER_COUNT,
    BIG_NUMBERS_POOL,
  );

  const [smallNumbers] = popNRandomValuesFromArray(
    NUMBER_COUNT - bigNumberCount,
    SMALL_NUMBERS_POOL,
  );

  const targetNumber = generateTargetNumber();

  return [[...bigNumbers, ...smallNumbers], targetNumber];
}
