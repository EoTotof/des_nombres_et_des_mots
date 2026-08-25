import { LetterTile } from "@dnedm/game-core";
import { ScreenSizeT } from "@/lib/tailwind";
import { gapVariants } from "./CurrentWord";
import clsx from "clsx";
import LetterTileCard from "./LetterTileCard";

type WordHistoryProps = {
  size: ScreenSizeT;
  words: LetterTile[][];
};

export default function WordHistory({ size, words }: WordHistoryProps) {
  return (
    <>
      {words.map((word) => (
        <div
          key={word.map(({ id }) => id).join("")}
          className={clsx(
            "grow-0 flex items-center justify-start",
            gapVariants[size],
          )}
        >
          {word.map((letterTile) => (
            <LetterTileCard key={letterTile.id} size={size} tile={letterTile} />
          ))}
        </div>
      ))}
    </>
  );
}
