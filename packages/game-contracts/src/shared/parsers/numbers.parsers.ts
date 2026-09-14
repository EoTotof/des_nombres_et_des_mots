import { NumbersGameState, NumberTile, Operation } from "@dnedm/game-core";
import { NumbersGamePayload, OperationPayload } from "../numbers.payloads.js";

export function parseOperationPayload(
  payload: OperationPayload,
  tiles: NumberTile[],
): Operation {
  // TODO word validation is in GameState class. Operation validation should too
  const { leftId, rightId, operator } = payload;

  const leftTile = tiles.find(({ id }) => id === leftId);
  const rightTile = tiles.find(({ id }) => id === rightId);
  if (!leftTile || !rightTile) {
    throw Error("invalid operation payload");
  }

  return new Operation(leftTile, rightTile, operator);
}

export function parseNumbersGamePayload(
  payload: NumbersGamePayload,
): NumbersGameState {
  const { initialTiles, targetNumber, operations: operationPayloads } = payload;
  const operations: Operation[] = [];
  const tilesAcc: NumberTile[] = [...initialTiles];

  for (const operationPayload of operationPayloads) {
    const parsedOperation = parseOperationPayload(operationPayload, tilesAcc);
    tilesAcc.push(parsedOperation.result);
    operations.push(parsedOperation);
  }

  return new NumbersGameState(initialTiles, targetNumber, operations);
}
