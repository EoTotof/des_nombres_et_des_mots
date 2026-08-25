import { NumbersGameState, NumberTile } from "@dnedm/game-core";
import NumberTileCard from "../cards/NumberTileCard";
import { useMemo } from "react";
import { useScreenSize } from "@/hooks/useScreenSize";

type BestAttemptProps = {
  bestAttempt: NumbersGameState;
};

export default function BestAttempt({ bestAttempt }: BestAttemptProps) {
  const screenSize = useScreenSize();

  const tile: NumberTile = useMemo(
    () => ({
      id: "best",
      value: bestAttempt.closestValue,
      isInitial: false,
    }),
    [bestAttempt],
  );

  return (
    <div>
      <NumberTileCard size={screenSize} tile={tile} />
    </div>
  );
}
