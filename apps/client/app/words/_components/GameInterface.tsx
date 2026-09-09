import { WordsGameState } from "@dnedm/game-core";
import { useMemo, useState } from "react";
import TilePool from "./interface/TilePool";
import { motion } from "motion/react";
import Button from "@/components/Button";
import { decrementScreenSize, useScreenSize } from "@/hooks/useScreenSize";
import Timer from "@/components/Timer";
import useCurrentWord from "../_hooks/useCurrentWord";
import CurrentWord from "./interface/CurrentWord";
import WordHistory from "./interface/WordHistory";
import useKeyboardInteraction from "../_hooks/useKeyboardInteraction";

type GameInterfaceProps = {
  gameState: WordsGameState;
  timer: number | null;
  updateGameState: (gameState: WordsGameState) => void;
  onValidate?: () => void;
};

export default function GameInterface({
  gameState,
  timer,
  updateGameState,
  onValidate,
}: GameInterfaceProps) {
  const screenSize = useScreenSize();

  const [isTileHovered, setIsTileHovered] = useState<boolean>(false);

  const {
    currentWord,
    selectLetter,
    removeLetter,
    removeLastLetter,
    validateWord,
  } = useCurrentWord((word) => updateGameState(gameState.pushWord(word)));

  useKeyboardInteraction(
    currentWord,
    selectLetter,
    removeLastLetter,
    validateWord,
  );

  const playableTiles = useMemo(() => {
    const playedTiles = currentWord.map(({ id }) => id);
    return gameState.initialTiles.filter(({ id }) => !playedTiles.includes(id));
  }, [currentWord, gameState]);

  return (
    <div className="flex-1">
      <div className="mb-32">
        <TilePool
          tiles={playableTiles}
          selectLetter={selectLetter}
          setIsTileHovered={setIsTileHovered}
        />
      </div>
      <div className="flex-1 gap-32 flex">
        <main className="flex-1 flex flex-col gap-32">
          <CurrentWord
            size={decrementScreenSize(screenSize)}
            currentWord={currentWord}
            validateWord={validateWord}
            removeLetter={removeLetter}
            isTileHovered={isTileHovered}
          />
          <motion.div layout className="grid grid-cols-1 gap-24">
            <WordHistory
              size={decrementScreenSize(screenSize)}
              words={gameState.words.toReversed()}
            />
          </motion.div>
        </main>
        <aside className="sm:w-128 md:w-196 lg:w-248">
          {timer !== null ? (
            <div className="mt-32">
              <Timer
                currentTime={timer}
                maxTime={gameState.parameters.duration || 0}
                showTime
              />
            </div>
          ) : null}
          {gameState.words.length > 0 && onValidate && (
            <div className="mt-64 flex flex-col items-center">
              <Button className="mt-16" onClick={onValidate}>
                Valider
              </Button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
