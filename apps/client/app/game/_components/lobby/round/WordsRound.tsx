import GameInterface from "@/app/words/_components/GameInterface";
import { WordsGameStateContext } from "@/app/words/_contexts/gameStateContext";
import {
  ObfuscatedWordsRoundPayload,
  ClientEvents,
  parseWordsGamePayload,
} from "@dnedm/game-contracts";
import { Socket } from "socket.io-client";

export default function WordsRound({
  payload,
  socket,
  timer,
  maxTime,
}: {
  payload: ObfuscatedWordsRoundPayload;
  socket: Socket;
  timer: number | null;
  maxTime: number;
}) {
  const currentState = parseWordsGamePayload(payload.currentPlayerState);

  return (
    <WordsGameStateContext value={{ currentGameState: currentState }}>
      <GameInterface
        gameState={currentState}
        timer={timer}
        maxTime={maxTime}
        pushMove={(word) =>
          socket.emit(ClientEvents.PushMove, { type: "word", move: word })
        }
      />
    </WordsGameStateContext>
  );
}
