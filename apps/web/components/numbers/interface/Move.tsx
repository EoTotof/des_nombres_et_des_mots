import { useNumbersGameContext } from "@/app/numbers/context";
import { Operator, Tile } from "@dnedm/game-core";
import TileCard from "../cards/TileCard";
import OperatorCard from "../cards/OperatorCard";
import clsx from "clsx";
import { Equal } from "lucide-react";

type MoveProps = {
  leftTile: Tile | null;
  operator: Operator | null;
  rightTile: Tile | null;
  resultTile: Tile | null;
  isValid: boolean;
};

export default function Move({
  leftTile,
  operator,
  rightTile,
  resultTile,
  isValid,
}: MoveProps) {
  const { tileCardSize, operatorCardSize } = useNumbersGameContext();

  const slotClassName = "bg-sky-200 inset-shadow-xs";
  const tileSlotClassName = "rounded-lg";

  return (
    <div className="flex items-center justify-center gap-16">
      <div
        className={clsx(slotClassName, tileSlotClassName)}
        style={{
          width: `${tileCardSize.width}px`,
          height: `${tileCardSize.height}px`,
        }}
      >
        {leftTile ? <TileCard tile={leftTile} /> : " "}
      </div>
      <div
        className={clsx(slotClassName, "rounded-xl")}
        style={{
          width: `${operatorCardSize.width}px`,
          height: `${operatorCardSize.height}px`,
        }}
      >
        {operator ? <OperatorCard operator={operator} /> : " "}
      </div>
      <div
        className={clsx(slotClassName, tileSlotClassName)}
        style={{
          width: `${tileCardSize.width}px`,
          height: `${tileCardSize.height}px`,
        }}
      >
        {rightTile ? <TileCard tile={rightTile} /> : " "}
      </div>
      <div
        className="py-16 text-center"
        style={{
          height: `${operatorCardSize.height}px`,
        }}
      >
        <Equal
          size={40} // TODO keep synced with Operator icon size
        />
      </div>
      <div
        className={clsx(slotClassName, tileSlotClassName)}
        style={{
          width: `${tileCardSize.width}px`,
          height: `${tileCardSize.height}px`,
        }}
      >
        {resultTile ? <TileCard tile={resultTile} isInvalid={!isValid} /> : " "}
      </div>
    </div>
  );
}
