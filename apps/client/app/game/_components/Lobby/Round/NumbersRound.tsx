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
  timer,
}: {
  payload: ObfuscatedNumbersRoundPayload;
  socket: Socket;
  timer: number | null;
}) {
  const currentState = parseNumbersGamePayload(payload.currentPlayerState);
  const bestAttempt = parseNumbersGamePayload(payload.currentBestAttempt);

  return (
    <NumbersGameStateContext value={{ currentGameState: currentState }}>
      <GameInterface
        gameState={currentState}
        bestAttempt={bestAttempt}
        timer={timer}
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
      />
    </NumbersGameStateContext>
  );
}
