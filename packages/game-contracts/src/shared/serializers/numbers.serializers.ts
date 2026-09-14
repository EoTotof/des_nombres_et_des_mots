import {
  NumbersGamePayload,
  ObfuscatedNumbersGamePayload,
  OperationPayload,
} from "@dnedm/game-contracts";
import { NumbersGameState, Operation } from "@dnedm/game-core";

export function serializeNumbersGame(
  game: NumbersGameState,
  obfuscated: true,
): ObfuscatedNumbersGamePayload;

export function serializeNumbersGame(
  game: NumbersGameState,
  obfuscated: false,
): NumbersGamePayload;

export function serializeNumbersGame(
  game: NumbersGameState,
  obfuscated: boolean,
): ObfuscatedNumbersGamePayload | NumbersGamePayload {
  switch (obfuscated) {
    case true:
      return { closestValue: game.closestValue };
    case false:
      return {
        initialTiles: game.initialTiles,
        targetNumber: game.targetNumber,
        operations: game.operations.map((operation) =>
          serializeOperation(operation),
        ),
      };
  }
}

export function serializeOperation(operation: Operation): OperationPayload {
  return {
    leftId: operation.left.id,
    rightId: operation.right.id,
    operator: operation.operator,
  };
}
