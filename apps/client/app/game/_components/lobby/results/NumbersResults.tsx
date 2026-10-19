import MoveHistory from "@/app/numbers/_components/interface/MoveHistory";
import { NumbersGameStateContext } from "@/app/numbers/_contexts/gameStateContext";
import {
  NumbersRoundPayload,
  parseNumbersGamePayload,
} from "@dnedm/game-contracts";
import { NumbersGameState } from "@dnedm/game-core";
import ResultsLayout from "./ResultsLayout";

export default function NumbersResults({
  payload,
  currentPlayer,
}: {
  payload: NumbersRoundPayload;
  currentPlayer: string;
}) {
  return (
    <ResultsLayout
      gameStates={payload.playerStates}
      currentPlayer={currentPlayer}
      gamePayloadParser={parseNumbersGamePayload}
      GameStateDisplay={NumbersGameStateDisplay}
    />
  );
}

function NumbersGameStateDisplay({
  gameState,
}: {
  gameState: NumbersGameState;
}) {
  if (gameState.operations.length === 0) {
    return "-";
  }

  return (
    <NumbersGameStateContext value={{ currentGameState: gameState }}>
      <div className="space-y-8">
        <MoveHistory operations={gameState.operations} size="sm" />
      </div>
    </NumbersGameStateContext>
  );
}
