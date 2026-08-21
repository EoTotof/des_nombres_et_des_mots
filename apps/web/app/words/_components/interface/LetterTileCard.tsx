import { ScreenSizeT } from "@/lib/tailwind";
import { LetterTile } from "@dnedm/game-core";
import clsx from "clsx";
import { MouseEventHandler } from "react";

type LetterTileCardProps = {
  size: ScreenSizeT;
  tile: LetterTile;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
};

export default function LetterTileCard({
  size,
  tile,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: LetterTileCardProps) {
  return (
    <button
      type="button"
      className={clsx(onClick && "cursor-pointer hover:scale-[1.1] transition")}
      onClick={(event) => {
        onClick?.(event);
        onMouseLeave?.(event);
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span
        className={clsx(
          "text-white font-semibold bg-sky-700 rounded-lg shadow-sm/30 flex items-center justify-center",
          letterTileCardClassNameVariants[size],
          letterTileCardPaddingVariants[size],
        )}
      >
        {tile.letter.toUpperCase()}
      </span>
    </button>
  );
}

const letterTileCardPaddingVariants: Record<ScreenSizeT, string> = {
  xs: "px-4",
  sm: "px-4",
  md: "px-8",
  lg: "px-8",
};

export const letterTileCardClassNameVariants: Record<ScreenSizeT, string> = {
  xs: "size-36 text-xl",
  sm: "size-48 text-3xl",
  md: "size-56 text-4xl",
  lg: "size-84 text-6xl",
};
