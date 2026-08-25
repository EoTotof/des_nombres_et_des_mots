"use client";

import { LetterTile } from "@dnedm/game-core";
import { AnimatePresence, motion } from "motion/react";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Dispatch, SetStateAction } from "react";
import LetterTileCard from "./LetterTileCard";

type TilePoolProps = {
  tiles: LetterTile[];
  selectLetter: (letter: LetterTile) => void;
  setIsTileHovered: Dispatch<SetStateAction<boolean>>;
};

export default function TilePool({
  tiles,
  selectLetter,
  setIsTileHovered,
}: TilePoolProps) {
  const screenSize = useScreenSize();

  return (
    <div className="p-16 flex flex-col gap-8 bg-sky-200 ring-1 ring-sky-300 rounded-lg md:gap-16">
      <AnimatePresence>
        <div className="grid grid-cols-10 gap-8 md:gap-16">
          {tiles.map((tile) => (
            <motion.div
              layout
              key={tile.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <LetterTileCard
                size={screenSize}
                tile={tile}
                onClick={() => selectLetter(tile)}
                onMouseEnter={() => setIsTileHovered(true)}
                onMouseLeave={() => setIsTileHovered(false)}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
