"use client";

import { Operator, Tile, Token } from "@dnedm/game-core";
import TileCard from "@/app/numbers/_components/cards/TileCard";
import OperatorCard from "../cards/OperatorCard";
import { AnimatePresence, motion } from "motion/react";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Dispatch, SetStateAction } from "react";

type TilePoolProps = {
  tiles: Tile[];
  selectToken: (token: Token) => void;
  setIsTileHovered: Dispatch<SetStateAction<boolean>>;
  setIsOperatorHovered: Dispatch<SetStateAction<boolean>>;
};

export default function TilePool({
  tiles,
  selectToken,
  setIsTileHovered,
  setIsOperatorHovered,
}: TilePoolProps) {
  const screenSize = useScreenSize();

  return (
    <div className="p-16 flex flex-col gap-8 bg-sky-200 ring-1 ring-sky-300 rounded-lg md:gap-16">
      <AnimatePresence>
        <div className="grid grid-cols-6 gap-8 md:gap-16">
          {tiles.map((tile) => (
            <motion.div
              layout
              key={tile.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <TileCard
                size={screenSize}
                tile={tile}
                onClick={() => selectToken(tile)}
                onMouseEnter={() => setIsTileHovered(true)}
                onMouseLeave={() => setIsTileHovered(false)}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
      <div className="flex gap-16 justify-center max-sm:gap-8">
        {(["+", "-", "*", "/"] as Operator[]).map((operator) => (
          <OperatorCard
            key={operator}
            size={screenSize}
            operator={operator}
            onClick={() => selectToken(operator)}
            onMouseEnter={() => setIsOperatorHovered(true)}
            onMouseLeave={() => setIsOperatorHovered(false)}
          />
        ))}
      </div>
    </div>
  );
}
