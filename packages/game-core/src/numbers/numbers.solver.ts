import { NumbersGameState } from "./numbers.game-state";
import { Operation } from "./numbers.operation";
import { NumberTile } from "./numbers.types";

export function solve(gameState: NumbersGameState): NumbersGameState {
  const initialTiles = gameState.initialTiles;
  const targetNumber = gameState.targetNumber;
  const initialGameState = new NumbersGameState(
    initialTiles,
    targetNumber,
    [],
    gameState.parameters,
  );

  let bestSolution = {
    gameState: initialGameState,
    distance: Infinity,
  };

  const visited = new Map<string, number>();

  search(initialTiles, []);

  function search(tiles: NumberTile[], pastOperations: Operation[]): void {
    // Several branches can lead to the same set of tiles
    // We keep searching only if this branch has less past operations
    const key = tiles
      .map((t) => t.value)
      .sort((a, b) => a - b)
      .join(",");

    const previousDepth = visited.get(key);
    const currentDepth = pastOperations.length;

    if (previousDepth !== undefined && previousDepth <= currentDepth) {
      return;
    }

    visited.set(key, currentDepth);

    // Save current branch if best solution yet
    for (const tile of tiles) {
      const distance = Math.abs(tile.value - targetNumber);

      if (
        distance < bestSolution.distance ||
        (distance === bestSolution.distance &&
          currentDepth < bestSolution.gameState.operations.length)
      ) {
        bestSolution = {
          gameState: new NumbersGameState(
            initialTiles,
            targetNumber,
            [...pastOperations],
            gameState.parameters,
          ),
          distance,
        };
      }
    }

    // If only 1 tile remaining, we cannot go further
    if (tiles.length === 1) {
      return;
    }

    // If exact solution with less operations already exists, do not go further
    if (
      bestSolution.distance === 0 &&
      currentDepth + 1 >= bestSolution.gameState.operations.length
    ) {
      return;
    }

    const usedValues = new Set<number>();

    for (let i = 0; i < tiles.length; i++) {
      const left = tiles[i];

      if (left === undefined) continue;

      // Small optimization for duplicate tiles
      if (usedValues.has(left.value)) continue;
      usedValues.add(left.value);

      for (let j = i + 1; j < tiles.length; j++) {
        const right = tiles[j];

        if (right === undefined) continue;

        for (const operation of Operation.getValidOperations(left, right)) {
          const nextTiles = tiles.filter(
            (_, index) => index !== i && index !== j,
          );

          nextTiles.push(operation.result);

          search(nextTiles, [...pastOperations, operation]);
        }
      }
    }
  }

  return bestSolution.gameState;
}
