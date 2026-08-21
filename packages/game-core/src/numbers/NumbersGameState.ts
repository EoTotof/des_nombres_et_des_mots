import {
  BIG_NUMBERS_POOL,
  generateInitialNumberTiles,
  generateTargetNumber,
} from "./generator";
import { Operation } from "./Operation";
import { solve } from "./solver";
import { NumbersRoundParameters, NumberTile } from "./types";

export const DEFAULT_NUMBERS_ROUND_PARAMETERS: NumbersRoundParameters = {
  bigNumberCount: 2,
  allowUnreachableTarget: true,
  duration: 60,
};

const MAX_BIG_NUMBER_COUNT = BIG_NUMBERS_POOL.length;

function getRandomBigNumberCount(): number {
  return Math.floor(Math.random() * (MAX_BIG_NUMBER_COUNT + 1));
}

export class NumbersGameState {
  initialTiles: NumberTile[];
  targetNumber: number;
  operations: Operation[];
  parameters: NumbersRoundParameters;

  constructor(
    initialTiles: NumberTile[],
    targetNumber: number,
    operations: Operation[],
    parameters: NumbersRoundParameters = DEFAULT_NUMBERS_ROUND_PARAMETERS,
  ) {
    this.initialTiles = initialTiles;
    this.targetNumber = targetNumber;
    this.operations = operations;
    this.parameters = parameters;
  }

  static initializeGame(parameters: NumbersRoundParameters): NumbersGameState {
    const { bigNumberCount, allowUnreachableTarget } = parameters;

    while (true) {
      const gameState = new NumbersGameState(
        generateInitialNumberTiles(bigNumberCount ?? getRandomBigNumberCount()),
        generateTargetNumber(),
        [],
        parameters,
      );

      const canReachTarget =
        gameState.getSolvedGameState().closestValue === gameState.targetNumber;

      if (allowUnreachableTarget || canReachTarget) {
        return gameState;
      }
    }
  }

  #useTiles(tiles: NumberTile[], operation: Operation): NumberTile[] {
    const currentTiles = [...tiles];

    const leftTileIndex = currentTiles.findIndex(
      ({ id }) => operation.left.id === id,
    );
    if (leftTileIndex === -1) {
      throw Error("Left tile does not exist");
    }
    currentTiles.splice(leftTileIndex, 1);

    const rightTileIndex = currentTiles.findIndex(
      ({ id }) => operation.right.id === id,
    );
    if (rightTileIndex === -1) {
      throw Error("Right tile does not exist");
    }
    currentTiles.splice(rightTileIndex, 1);

    return currentTiles;
  }

  get currentTiles(): NumberTile[] {
    let currentTiles = [...this.initialTiles];

    this.operations.forEach((operation) => {
      currentTiles = this.#useTiles(currentTiles, operation);

      if (operation.isValid) {
        currentTiles.push(operation.result);
      }
    });

    return currentTiles;
  }

  get allTiles(): NumberTile[] {
    const allTiles = [...this.initialTiles];

    this.operations.forEach((operation) => {
      if (operation.isValid) {
        allTiles.push(operation.result);
      }
    });

    return allTiles;
  }

  get closestValue(): number {
    let closestValue = 0;

    this.allTiles.forEach((tile) => {
      if (
        Math.abs(this.targetNumber - tile.value) <
        Math.abs(this.targetNumber - closestValue)
      ) {
        closestValue = tile.value;
      }
    });

    return closestValue;
  }

  pushOperation(operation: Operation): NumbersGameState {
    // TODO we can check if operation is valid
    return new NumbersGameState(
      this.initialTiles,
      this.targetNumber,
      [...this.operations, operation],
      this.parameters,
    );
  }

  removeOperation(operation: Operation): NumbersGameState {
    /** Removes arg operation and all subsequent operations that depend on it */
    const remainingOperations = this.operations.filter(
      ({ id }) => !id.includes(operation.id),
    );

    return new NumbersGameState(
      this.initialTiles,
      this.targetNumber,
      remainingOperations,
      this.parameters,
    );
  }

  static getBestAttempt(
    gameStateA: NumbersGameState,
    gameStateB: NumbersGameState,
  ) {
    if (gameStateA.targetNumber !== gameStateB.targetNumber) {
      throw Error("Cannot compare game states with different target values");
    }

    const targetNumber = gameStateA.targetNumber;
    const distanceToTargetA = Math.abs(gameStateA.closestValue - targetNumber);
    const distanceToTargetB = Math.abs(gameStateB.closestValue - targetNumber);

    if (distanceToTargetA > distanceToTargetB) return gameStateB;
    if (distanceToTargetA < distanceToTargetB) return gameStateA;

    // Same distance to target: we keep attempt with the most tiles remaining
    // In case of equality, we keep A arbitrarily
    if (gameStateA.currentTiles.length < gameStateB.currentTiles.length) {
      return gameStateB;
    }

    return gameStateA;
  }

  getSolvedGameState(): NumbersGameState {
    return solve(this);
  }
}
