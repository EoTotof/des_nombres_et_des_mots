import { Operation } from "@dnedm/game-core";
import PreviousMove from "./PreviousMove";
import { ScreenSizeT } from "@/lib/tailwind";

type MoveHistoryProps = {
  size: ScreenSizeT;
  operations: Operation[];
  //selectToken: (tile: Tile) => void;
  onDelete?: (operation: Operation) => void;
};

export default function MoveHistory({
  size,
  operations,
  //selectToken,
  onDelete,
}: MoveHistoryProps) {
  return (
    <>
      {operations.map((operation) => (
        <PreviousMove
          key={operation.id}
          size={size}
          operation={operation}
          //selectResultTile={selectToken}
          onDelete={onDelete ? () => onDelete(operation) : undefined}
        />
      ))}
    </>
  );
}
