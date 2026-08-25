"use client";

import { NumberTile } from "@dnedm/game-core";
import { useMeasure } from "@react-hookz/web";
import clsx from "clsx";
import { useNumbersGameStateContext } from "../../_contexts/gameStateContext";
import { ScreenSizeT } from "@/lib/tailwind";
import { MouseEventHandler } from "react";

type NumberTileCardProps = {
  size: ScreenSizeT;
  tile: NumberTile;
  isInvalid?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
};

export default function NumberTileCard({
  size,
  tile,
  isInvalid,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: NumberTileCardProps) {
  const { currentGameState } = useNumbersGameStateContext();

  const [cardMeasures, cardRef] = useMeasure<HTMLDivElement>();
  const [textMeasures, textRef] = useMeasure<HTMLDivElement>();

  const scaling =
    cardMeasures?.width && textMeasures?.width
      ? Math.min(1, cardMeasures.width / textMeasures.width)
      : 1;

  const isTarget = tile.value === currentGameState.targetNumber;

  let backgroundColor: string | undefined = "var(--color-slate-500)";
  if (tile.isInitial) backgroundColor = "var(--color-sky-600)";
  if (isInvalid) backgroundColor = "var(--color-red-500)";
  if (isTarget) backgroundColor = "var(--color-green-600)";

  return (
    <button
      type="button"
      className={clsx(
        "flex-1 w-full",
        onClick && "cursor-pointer hover:scale-[1.1] transition",
      )}
      onClick={(event) => {
        onClick?.(event);
        onMouseLeave?.(event);
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span
        className={clsx(
          "flex text-white rounded-lg shadow-sm/30",
          numberTileCardClassNameVariants[size],
          numberTileCardPaddingVariants[size],
        )}
        style={{ backgroundColor }}
      >
        <span
          ref={cardRef}
          className="relative flex-1 flex items-center justify-center"
        >
          <span
            ref={textRef}
            className="absolute top-1/2 left-1/2 -translate-1/2 origin-center whitespace-nowrap font-bold"
            style={{ transform: `scale(${scaling})` }}
          >
            {Math.round(tile.value * 100) / 100}
          </span>
        </span>
      </span>
    </button>
  );
}

const numberTileCardPaddingVariants: Record<ScreenSizeT, string> = {
  xs: "px-4",
  sm: "px-4",
  md: "px-8",
  lg: "px-8",
};

export const numberTileCardClassNameVariants: Record<ScreenSizeT, string> = {
  xs: "h-36 w-44 text-xl",
  sm: "h-48 w-64 text-3xl",
  md: "h-56 w-66 text-4xl",
  lg: "h-84 w-98 text-6xl",
};
