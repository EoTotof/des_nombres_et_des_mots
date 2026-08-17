import { describe, expect, it } from "vitest";

import { solve } from "../../src/numbers/solver";
import { NumberTile } from "../../src/numbers/types";

function tile(id: string, value: number): NumberTile {
  return {
    id,
    value,
    isInitial: true,
  };
}

describe("solve", () => {
  it("finds an exact solution", () => {
    const initialTiles = [
      tile("a", 2),
      tile("b", 3),
      tile("c", 5),
      tile("d", 10),
    ];

    const gameState = solve(initialTiles, 25);

    expect(gameState.closestValue).toBe(25);
  });

  it("finds a simple one-operation solution", () => {
    const initialTiles = [
      tile("a", 10),
      tile("b", 5),
      tile("c", 3),
      tile("d", 2),
    ];

    const gameState = solve(initialTiles, 15);

    expect(gameState.closestValue).toBe(15);
    expect(gameState.operations).toHaveLength(1);

    const operation = gameState.operations[0];

    expect(operation?.result.value).toBe(15);
    expect(operation?.isValid).toBe(true);
  });

  it("prefers fewer operations for the same result", () => {
    const initialTiles = [
      tile("a", 10),
      tile("b", 5),
      tile("c", 2),
      tile("d", 1),
    ];

    const gameState = solve(initialTiles, 15);

    expect(gameState.closestValue).toBe(15);
    expect(gameState.operations).toHaveLength(1);
  });

  it("returns the closest value when no exact solution exists", () => {
    const initialTiles = [
      tile("a", 1),
      tile("b", 2),
      tile("c", 3),
      tile("d", 4),
    ];

    const gameState = solve(initialTiles, 100);

    expect(gameState.closestValue).toBe(36);
  });
});
