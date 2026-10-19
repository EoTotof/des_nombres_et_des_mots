import WordHistory from "@/app/words/_components/interface/WordHistory";
import {
  WordsRoundPayload,
  parseWordsGamePayload,
} from "@dnedm/game-contracts";
import ResultsLayout from "./ResultsLayout";
import { WordsGameState } from "@dnedm/game-core";

export default function WordsResults({
  payload,
  currentPlayer,
}: {
  payload: WordsRoundPayload;
  currentPlayer: string;
}) {
  return (
    <ResultsLayout
      gameStates={payload.playerStates}
      currentPlayer={currentPlayer}
      gamePayloadParser={parseWordsGamePayload}
      GameStateDisplay={WordsGameStateDisplay}
    />
  );
}

function WordsGameStateDisplay({ gameState }: { gameState: WordsGameState }) {
  if (gameState.longestWords.length === 0) {
    return "-";
  }

  return (
    <div className="space-y-8">
      <WordHistory words={gameState.longestWords.slice(0, 5)} size="sm" />
    </div>
  );
}
