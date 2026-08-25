import { ScreenSizeT } from "@/lib/tailwind";
import { CurrentWordT } from "../../_hooks/useCurrentWord";
import { LetterTile } from "@dnedm/game-core";
import clsx from "clsx";
import LetterTileCard, {
  letterTileCardClassNameVariants,
} from "./LetterTileCard";
import { useWordsGameStateContext } from "../../_contexts/gameStateContext";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";

type CurrentWordProps = {
  size: ScreenSizeT;
  currentWord: CurrentWordT;
  validateWord: () => void;
  removeLetter: (letter: LetterTile) => void;
  isTileHovered: boolean;
};

export default function CurrentWord({
  size,
  currentWord,
  validateWord,
  removeLetter,
  isTileHovered,
}: CurrentWordProps) {
  const { currentGameState } = useWordsGameStateContext();

  return (
    <div
      className={clsx(
        "grow-0 grid grid-cols-11 items-center justify-start",
        gapVariants[size],
      )}
    >
      <AnimatePresence>
        {currentWord.map((letterTile) => (
          <motion.div
            layout
            key={letterTile.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <LetterTileCard
              key={letterTile.id}
              size={size}
              tile={letterTile}
              onClick={() => removeLetter(letterTile)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      {currentWord.length < currentGameState.initialTiles.length ? (
        <div
          className={clsx(
            "bg-sky-200 rounded-lg transition",
            letterTileCardClassNameVariants[size],
            isTileHovered ? "inset-shadow-sm/40" : "inset-shadow-xs",
          )}
        ></div>
      ) : null}
      <div>
        <button
          type="button"
          onClick={validateWord}
          className={
            "p-8 text-center text-white font-semibold bg-sky-600 rounded-lg cursor-pointer hover:bg-sky-700 active:bg-sky-800"
          }
          style={{ opacity: currentWord.length > 0 ? "initial" : 0 }}
        >
          <Check size={32} />
        </button>
      </div>
    </div>
  );
}

export const gapVariants: Record<ScreenSizeT, string> = {
  xs: "gap-4",
  sm: "gap-4",
  md: "gap-8",
  lg: "gap-8",
};
