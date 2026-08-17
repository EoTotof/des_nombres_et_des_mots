import { GameState, Tile } from "@dnedm/game-core";
import TileCard from "../cards/TileCard";
import { useMemo } from "react";
import { useScreenSize } from "@/hooks/useScreenSize";

type BestAttemptProps = {
  bestAttempt: GameState;
};

export default function BestAttempt({ bestAttempt }: BestAttemptProps) {
  const screenSize = useScreenSize();

  const tile: Tile = useMemo(
    () => ({
      id: "best",
      value: bestAttempt.closestValue,
      isInitial: false,
    }),
    [bestAttempt],
  );

  return (
    <div>
      <TileCard size={screenSize} tile={tile} />
    </div>
  );
}
