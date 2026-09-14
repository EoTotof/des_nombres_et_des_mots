import GameInterface from "@/app/numbers/_components/GameInterface";
import { NumbersGameStateContext } from "@/app/numbers/_contexts/gameStateContext";
import {
  ClientEvents,
  ObfuscatedNumbersRoundPayload,
  parseNumbersGamePayload,
  serializeOperation,
} from "@dnedm/game-contracts";
import { Socket } from "socket.io-client";

export default function NumbersRound({
  payload,
  socket,
}: {
  payload: ObfuscatedNumbersRoundPayload;
  socket: Socket;
}) {
  const currentState = parseNumbersGamePayload(payload.currentPlayerState);
  const bestAttempt = parseNumbersGamePayload(payload.currentBestAttempt);

  return (
    <NumbersGameStateContext value={{ currentGameState: currentState }}>
      <GameInterface
        gameState={currentState}
        bestAttempt={bestAttempt}
        timer={null}
        pushMove={(operation) =>
          socket.emit(ClientEvents.PushMove, {
            type: "operation",
            move: serializeOperation(operation),
          })
        }
        undoMove={(operation) =>
          socket.emit(ClientEvents.UndoMove, {
            moveId: operation.id,
          })
        }
      ></GameInterface>
    </NumbersGameStateContext>
  );
}
