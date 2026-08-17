import { Operation } from "@dnedm/game-core";
import Move from "./Move";
import { ScreenSizeT } from "@/lib/tailwind";

type PreviousMoveProps = {
  size: ScreenSizeT;
  operation: Operation;
  //selectResultTile: (tile: Tile) => void;
  onDelete?: () => void;
};

export default function PreviousMove({
  size,
  operation,
  //selectResultTile,
  onDelete,
}: PreviousMoveProps) {
  const { left, operator, right, result, isValid } = operation;
  return (
    <Move
      size={size}
      leftTile={left}
      operator={operator}
      rightTile={right}
      resultTile={result}
      isValid={isValid}
      //onClickResult={() => selectResultTile(result)}
      onDelete={onDelete}
    />
  );
}
