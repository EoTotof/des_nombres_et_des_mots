import { Operator, NumberTile, Token } from "@dnedm/game-core";
import NumberTileCard, {
  numberTileCardClassNameVariants,
} from "../cards/NumberTileCard";
import OperatorCard, {
  operatorCardClassNameVariants,
  operatorIconSizeVariants,
} from "../cards/OperatorCard";
import clsx from "clsx";
import { Equal, Trash2 } from "lucide-react";
import { ScreenSizeT } from "@/lib/tailwind";

type MoveProps = {
  size: ScreenSizeT;
  leftTile: NumberTile | null;
  operator: Operator | null;
  rightTile: NumberTile | null;
  resultTile: NumberTile | null;
  isValid?: boolean;
  onClickToken?: (token: Token) => void;
  onClickResult?: () => void;
  onDelete?: (() => void) | null;
  isTileHovered?: boolean;
  isOperatorHovered?: boolean;
};

export default function Move({
  size,
  leftTile,
  operator,
  rightTile,
  resultTile,
  isValid,
  onClickToken,
  onClickResult,
  onDelete,
  isTileHovered,
  isOperatorHovered,
}: MoveProps) {
  const slotClassName = "bg-sky-200 transition";
  const tileSlotClassName = "rounded-lg";

  return (
    <div
      className={clsx(
        "grow-0 flex items-center justify-center",
        moveGapVariants[size],
      )}
    >
      <div
        className={clsx(
          slotClassName,
          tileSlotClassName,
          numberTileCardClassNameVariants[size],
          !leftTile && isTileHovered ? "inset-shadow-sm/40" : "inset-shadow-xs",
        )}
      >
        {leftTile ? (
          <NumberTileCard
            size={size}
            tile={leftTile}
            onClick={onClickToken ? () => onClickToken(leftTile) : undefined}
          />
        ) : null}
      </div>
      <div
        className={clsx(
          slotClassName,
          "rounded-xl",
          operatorCardClassNameVariants[size],
          !operator && isOperatorHovered
            ? "inset-shadow-sm/40"
            : "inset-shadow-xs",
        )}
      >
        {operator ? (
          <OperatorCard
            size={size}
            operator={operator}
            onClick={onClickToken ? () => onClickToken(operator) : undefined}
          />
        ) : null}
      </div>
      <div
        className={clsx(
          slotClassName,
          tileSlotClassName,
          numberTileCardClassNameVariants[size],
          leftTile && !rightTile && isTileHovered
            ? "inset-shadow-sm/40"
            : "inset-shadow-xs",
        )}
      >
        {rightTile ? (
          <NumberTileCard
            size={size}
            tile={rightTile}
            onClick={onClickToken ? () => onClickToken(rightTile) : undefined}
          />
        ) : null}
      </div>
      <Equal size={operatorIconSizeVariants[size]} />
      <div
        className={clsx(
          slotClassName,
          tileSlotClassName,
          numberTileCardClassNameVariants[size],
        )}
      >
        {resultTile ? (
          <NumberTileCard
            size={size}
            tile={resultTile}
            isInvalid={!isValid}
            onClick={onClickResult}
          />
        ) : null}
      </div>
      {onDelete !== undefined && (
        <button
          type="button"
          onClick={onDelete ?? undefined}
          className={clsx("p-16 text-center")}
          style={{ opacity: onDelete ? "initial" : 0 }}
        >
          <Trash2 size={40} />
        </button>
      )}
    </div>
  );
}

const moveGapVariants: Record<ScreenSizeT, string> = {
  xs: "gap-8",
  sm: "gap-8",
  md: "gap-16",
  lg: "gap-16",
};
