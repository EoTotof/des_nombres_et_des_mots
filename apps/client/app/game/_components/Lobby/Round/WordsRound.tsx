import GameInterface from "@/app/words/_components/GameInterface";
import { WordsGameStateContext } from "@/app/words/_contexts/gameStateContext";
import {
  WordsGamePayload,
  ObfuscatedWordsRoundPayload,
} from "@dnedm/game-contracts";
import { WordsGameState } from "@dnedm/game-core";

export default function WordsRound({
  payload,
}: {
  payload: ObfuscatedWordsRoundPayload;
}) {
  const currentState = parseWordsGamePayload(payload.currentPlayerState);

  return (
    <WordsGameStateContext value={{ currentGameState: currentState }}>
      <GameInterface
        gameState={currentState}
        timer={null}
        updateGameState={() => {}}
      ></GameInterface>
    </WordsGameStateContext>
  );
}

function parseWordsGamePayload(payload: WordsGamePayload): WordsGameState {
  const { initialTiles, words } = payload;

  return new WordsGameState(initialTiles, words);
}
