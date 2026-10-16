import MoveHistory from "@/app/numbers/_components/interface/MoveHistory";
import { NumbersGameStateContext } from "@/app/numbers/_contexts/gameStateContext";
import {
  NumbersRoundPayload,
  parseNumbersGamePayload,
} from "@dnedm/game-contracts";

export default function NumbersResults({
  payload,
  currentPlayer,
}: {
  payload: NumbersRoundPayload;
  currentPlayer: string;
}) {
  const currentPlayerGamePayload = payload.playerStates[currentPlayer];

  if (!currentPlayerGamePayload) {
    throw Error("Player not found");
  }

  const currentPlayerGameState = parseNumbersGamePayload(
    currentPlayerGamePayload,
  );

  const solution = currentPlayerGameState.getSolvedGameState();

  return (
    <NumbersGameStateContext
      value={{ currentGameState: currentPlayerGameState }}
    >
      <div className="flex flex-col gap-16 text-center text-xl md:flex-row">
        {currentPlayerGameState.operations.length > 0 ? (
          <div className="flex-1">
            <div className="mb-8">Votre réponse :</div>
            <div className="space-y-8">
              <MoveHistory
                operations={currentPlayerGameState.operations}
                size="sm"
              />
            </div>
          </div>
        ) : null}
        <div className="flex-1">
          <div className="mb-8">Solution :</div>
          <div className="space-y-8">
            <MoveHistory operations={solution.operations} size="sm" />
          </div>
        </div>
      </div>
    </NumbersGameStateContext>
  );
}
