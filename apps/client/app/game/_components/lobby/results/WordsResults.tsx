import WordHistory from "@/app/words/_components/interface/WordHistory";
import {
  WordsRoundPayload,
  parseWordsGamePayload,
} from "@dnedm/game-contracts";

export default function WordsResults({
  payload,
  currentPlayer,
}: {
  payload: WordsRoundPayload;
  currentPlayer: string;
}) {
  const currentPlayerGamePayload = payload.playerStates[currentPlayer];

  if (!currentPlayerGamePayload) {
    throw Error("Player not found");
  }

  const currentPlayerGameState = parseWordsGamePayload(
    currentPlayerGamePayload,
  );

  const solution = currentPlayerGameState.getSolvedGameState();

  return (
    <div className="flex flex-col gap-16 text-center text-xl md:flex-row">
      {currentPlayerGameState.longestWords.length > 0 ? (
        <div className="flex-1">
          <div className="mb-8">Votre réponse :</div>
          <div className="space-y-8">
            <WordHistory
              words={currentPlayerGameState.longestWords}
              size="sm"
            />
          </div>
        </div>
      ) : null}
      <div className="flex-1">
        <div className="mb-8">Solution :</div>
        <div className="space-y-8">
          <WordHistory words={solution.longestWords.slice(0, 5)} size="sm" />
        </div>
      </div>
    </div>
  );
}
