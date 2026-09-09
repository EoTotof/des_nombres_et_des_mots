import GameInterface from "@/app/numbers/_components/GameInterface";
import { NumbersGameStateContext } from "@/app/numbers/_contexts/gameStateContext";
import {
  NumbersGamePayload,
  ObfuscatedNumbersRoundPayload,
} from "@dnedm/game-contracts";
import { NumbersGameState, NumberTile, Operation } from "@dnedm/game-core";

export default function NumbersRound({
  payload,
}: {
  payload: ObfuscatedNumbersRoundPayload;
}) {
  const currentState = parseNumbersGamePayload(payload.currentPlayerState);
  const bestAttempt = parseNumbersGamePayload(payload.currentBestAttempt);

  return (
    <NumbersGameStateContext value={{ currentGameState: currentState }}>
      <GameInterface
        gameState={currentState}
        bestAttempt={bestAttempt}
        timer={null}
        updateGameState={() => {}}
      ></GameInterface>
    </NumbersGameStateContext>
  );
}

function parseNumbersGamePayload(
  payload: NumbersGamePayload,
): NumbersGameState {
  const { initialTiles, targetNumber, operations: operationPayloads } = payload;
  const operations: Operation[] = [];
  const tilesAcc: NumberTile[] = [...initialTiles];

  for (const operation of operationPayloads) {
    const { leftId, rightId, operator } = operation;

    const leftTile = tilesAcc.find(({ id }) => id === leftId);
    const rightTile = tilesAcc.find(({ id }) => id === rightId);
    if (!leftTile || !rightTile) {
      throw Error("invalid numbers game payload");
    }

    const parsedOperation = new Operation(leftTile, rightTile, operator);
    tilesAcc.push(parsedOperation.result);
    operations.push(parsedOperation);
  }

  return new NumbersGameState(initialTiles, targetNumber, operations);
}
