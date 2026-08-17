import TargetCard from "@/app/numbers/_components/cards/TargetCard";
import { GameState } from "@dnedm/game-core";
import { useMemo, useState } from "react";
import useCurrentMove from "../_hooks/useCurrentMove";
import CurrentMove from "./interface/CurrentMove";
import TilePool from "./interface/TilePool";
import MoveHistory from "./interface/MoveHistory";
import { motion } from "motion/react";
import BestAttempt from "./interface/BestAttempt";
import Button from "@/components/Button";
import { useScreenSize } from "@/hooks/useScreenSize";
import Timer from "@/components/Timer";

type GameInterfaceProps = {
  gameState: GameState;
  timer: number | null;
  bestAttempt: GameState | null;
  updateGameState: (gameState: GameState) => void;
  onValidate: () => void;
};

export default function GameInterface({
  gameState,
  timer,
  bestAttempt,
  updateGameState,
  onValidate,
}: GameInterfaceProps) {
  const screenSize = useScreenSize();

  const [isTileHovered, setIsTileHovered] = useState<boolean>(false);
  const [isOperatorHovered, setIsOperatorHovered] = useState<boolean>(false);

  const { currentMove, selectToken, removeToken, resetCurrentMove } =
    useCurrentMove((operation) =>
      updateGameState(gameState.pushOperation(operation)),
    );

  const playableTiles = useMemo(
    () =>
      gameState.currentTiles.filter(
        ({ id }) =>
          currentMove.leftTile?.id !== id && currentMove.rightTile?.id !== id,
      ),
    [currentMove, gameState],
  );

  return (
    <div className="flex-1 gap-32 flex">
      <main className="flex-1 flex flex-col gap-32">
        <TilePool
          tiles={playableTiles}
          selectToken={selectToken}
          setIsTileHovered={setIsTileHovered}
          setIsOperatorHovered={setIsOperatorHovered}
        />
        <motion.div layout className="grid grid-cols-1 gap-24">
          <CurrentMove
            size={screenSize}
            currentMove={currentMove}
            removeToken={removeToken}
            reset={resetCurrentMove}
            isTileHovered={isTileHovered}
            isOperatorHovered={isOperatorHovered}
          />
          <MoveHistory
            size={screenSize}
            operations={gameState.operations.toReversed()}
            //selectToken={selectToken} // TODO needs to be aware of invalid/already-used tokens
            onDelete={(operation) => {
              updateGameState(gameState.removeOperation(operation));
              resetCurrentMove(); // TODO could be better
            }}
          />
        </motion.div>
      </main>
      <aside className="">
        <TargetCard size={screenSize} targetValue={gameState.targetNumber} />
        {timer !== null ? (
          <div className="mt-32">
            <Timer currentTime={timer} maxTime={60} showTime />
          </div>
        ) : null}
        {bestAttempt && (
          <div className="mt-64 flex flex-col items-center">
            <BestAttempt bestAttempt={bestAttempt} />
            <Button className="mt-16" onClick={onValidate}>
              Valider
            </Button>
          </div>
        )}
      </aside>
    </div>
  );
}
