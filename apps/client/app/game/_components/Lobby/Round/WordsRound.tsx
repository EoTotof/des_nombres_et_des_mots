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
}: {
  payload: ObfuscatedWordsRoundPayload;
  socket: Socket;
}) {
  const currentState = parseWordsGamePayload(payload.currentPlayerState);

  return (
    <WordsGameStateContext value={{ currentGameState: currentState }}>
      <GameInterface
        gameState={currentState}
        timer={null}
        pushMove={(word) =>
          socket.emit(ClientEvents.PushMove, { type: "word", move: word })
        }
      ></GameInterface>
    </WordsGameStateContext>
  );
}
