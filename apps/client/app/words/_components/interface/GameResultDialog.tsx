import Dialog from "@/components/Dialog";
import { WordsGameState } from "@dnedm/game-core";
import Button from "@/components/Button";
import WordHistory from "./WordHistory";

type GameResultDialogProps = {
  gameState: WordsGameState;
  solution: WordsGameState;
  startNewGame: () => void;
};

export default function GameResultDialog({
  gameState,
  solution,
  startNewGame,
}: GameResultDialogProps) {
  return (
    <Dialog title="Résultat">
      <div className="flex flex-col gap-16 text-center text-xl md:flex-row">
        {gameState.words.length > 0 ? (
          <div className="flex-1">
            <div className="mb-8">Votre réponse :</div>
            <div className="space-y-8">
              <WordHistory words={gameState.longestWords} size="sm" />
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
      <Button onClick={startNewGame}>Rejouer</Button>
    </Dialog>
  );
}
