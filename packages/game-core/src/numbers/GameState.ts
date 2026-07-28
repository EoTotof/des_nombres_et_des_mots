import { generateInitialTiles, generateTargetNumber } from "./generator";
import Operation from "./Operation";
import { Tile } from "./types";

export default class GameState {
  initialTiles: Tile[];
  targetNumber: number;
  operations: Operation[];

  constructor(bigNumberCount: number) {
    this.initialTiles = generateInitialTiles(bigNumberCount);
    this.targetNumber = generateTargetNumber();
    this.operations = [];
  }

  #useTiles(tiles: Tile[], operation: Operation): Tile[] {
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

  get currentTiles(): Tile[] {
    let currentTiles = [...this.initialTiles];

    this.operations.forEach((operation) => {
      currentTiles = this.#useTiles(currentTiles, operation);

      if (operation.isValid()) {
        currentTiles.push(operation.result);
      }
    });

    return currentTiles;
  }

  get allTiles(): Tile[] {
    const allTiles = [...this.initialTiles];

    this.operations.forEach((operation) => {
      if (operation.isValid()) {
        allTiles.push(operation.result);
      }
    });

    return allTiles;
  }

  get closestValue(): number {
    let closestValue = 0;

    this.allTiles.forEach((tile) => {
      if (
        Math.abs(this.targetNumber - tile.value) >
        Math.abs(this.targetNumber - closestValue)
      ) {
        closestValue = tile.value;
      }
    });

    return closestValue;
  }
}
