import Dialog from "@/components/Dialog";
import { GameState } from "@dnedm/game-core";
import MoveHistory from "./MoveHistory";
import Button from "@/components/Button";

type GameResultDialogProps = {
  bestAttempt: GameState;
  solution: GameState;
  startNewGame: () => void;
};

export default function GameResultDialog({
  bestAttempt,
  solution,
  startNewGame,
}: GameResultDialogProps) {
  return (
    <Dialog title="Résultat">
      <div className="flex flex-col gap-16 text-center text-xl md:flex-row">
        {bestAttempt.operations.length > 0 ? (
          <div className="flex-1">
            <div className="mb-8">Votre réponse :</div>
            <div className="space-y-8">
              <MoveHistory operations={bestAttempt.operations} size="sm" />
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
      <Button onClick={startNewGame}>Rejouer</Button>
    </Dialog>
  );
}
