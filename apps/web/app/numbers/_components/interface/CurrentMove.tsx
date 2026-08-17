import { Token } from "@dnedm/game-core";
import { CurrentMoveT } from "../../_hooks/useCurrentMove";
import Move from "./Move";
import { ScreenSizeT } from "@/lib/tailwind";

type CurrentMoveProps = {
  size: ScreenSizeT;
  currentMove: CurrentMoveT;
  removeToken: (token: Token) => void;
  reset: () => void;
  isTileHovered: boolean;
  isOperatorHovered: boolean;
};

export default function CurrentMove({
  size,
  currentMove,
  removeToken,
  reset,
  isTileHovered,
  isOperatorHovered,
}: CurrentMoveProps) {
  return (
    <Move
      size={size}
      {...currentMove}
      resultTile={null}
      onClickToken={removeToken}
      onDelete={
        currentMove.leftTile || currentMove.operator || currentMove.rightTile
          ? reset
          : null
      }
      isTileHovered={isTileHovered}
      isOperatorHovered={isOperatorHovered}
    />
  );
}
