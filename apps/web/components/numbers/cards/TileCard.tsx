"use client";

import { Tile } from "@dnedm/game-core";
import { useMeasure } from "@react-hookz/web";

type TileCardProps = {
  tile: Tile;
  isInvalid?: boolean;
  isTarget?: boolean;
};

export default function TileCard({ tile, isInvalid, isTarget }: TileCardProps) {
  const [cardMeasures, cardRef] = useMeasure<HTMLDivElement>();
  const [textMeasures, textRef] = useMeasure<HTMLDivElement>();

  const scaling =
    cardMeasures?.width && textMeasures?.width
      ? Math.min(1, cardMeasures.width / textMeasures.width)
      : 1;

  let backgroundColor: string | undefined = undefined;
  if (isInvalid) backgroundColor = "var(--color-red-500)";
  if (isTarget) backgroundColor = "var(--color-green-600)";

  return (
    <div
      className="flex-1 flex p-16 text-white bg-sky-600 rounded-lg shadow-sm/30 max-lg:p-8 max-sm:p-4"
      style={{ backgroundColor }}
    >
      <div
        ref={cardRef}
        className="relative flex-1 flex items-center justify-center"
        style={{ minHeight: textMeasures?.height }}
      >
        <div
          ref={textRef}
          className="absolute top-1/2 left-1/2 -translate-1/2 origin-center whitespace-nowrap text-6xl font-bold max-md:text-2xl"
          style={{ transform: `scale(${scaling})` }}
        >
          {tile.value}
        </div>
      </div>
    </div>
  );
}
