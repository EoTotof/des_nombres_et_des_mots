import { popNRandomValuesFromArray } from "../utils";
import { NumberTile } from "./types";

const SMALL_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const SMALL_NUMBERS_POOL = [...SMALL_NUMBERS, ...SMALL_NUMBERS];
const BIG_NUMBERS = [25, 50, 75, 100];
const BIG_NUMBERS_POOL = [...BIG_NUMBERS];

const MIN_TARGET = 100; // inclusive
const MAX_TARGET = 1000; // exclusive (max pick is 999)

const NUMBER_COUNT = 6;

export function generateTargetNumber(): number {
  return Math.floor(Math.random() * (MAX_TARGET - MIN_TARGET)) + MIN_TARGET;
}

export function generateInitialTiles(bigNumberCount: number): NumberTile[] {
  if (
    bigNumberCount > NUMBER_COUNT ||
    bigNumberCount > BIG_NUMBERS_POOL.length
  ) {
    throw Error("Big number count is too large");
  }

  const bigNumbersPool = [...BIG_NUMBERS_POOL];
  const [bigNumbers] = popNRandomValuesFromArray(
    bigNumberCount,
    bigNumbersPool,
  );

  const smallNumbersPool = [...SMALL_NUMBERS_POOL];
  const [smallNumbers] = popNRandomValuesFromArray(
    NUMBER_COUNT - bigNumberCount,
    smallNumbersPool,
  );

  return [...bigNumbers, ...smallNumbers].map((value, index) => ({
    id: index.toString(),
    value,
    isInitial: true,
  }));
}
