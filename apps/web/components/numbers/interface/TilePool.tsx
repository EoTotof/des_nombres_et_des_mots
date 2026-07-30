"use client";

import { Tile } from "@dnedm/game-core";
import TileCard from "@/components/numbers/cards/TileCard";
import OperatorCard from "../cards/OperatorCard";
import { useNumbersGameContext } from "@/app/numbers/context";
import { useMeasure } from "@react-hookz/web";
import { useEffect } from "react";

type TilePoolProps = {
  tiles: Tile[];
};

export default function TilePool({ tiles }: TilePoolProps) {
  const { setTileCardSize, setOperatorCardSize } = useNumbersGameContext();
  const [tileCardMeasures, tileCardRef] = useMeasure<HTMLDivElement>();
  const [operatorCardMeasures, operatorCardRef] = useMeasure<HTMLDivElement>();

  useEffect(() => {
    if (tileCardMeasures) setTileCardSize(tileCardMeasures);
  }, [tileCardMeasures, setTileCardSize]);

  useEffect(() => {
    if (operatorCardMeasures) setOperatorCardSize(operatorCardMeasures);
  }, [operatorCardMeasures, setOperatorCardSize]);

  return (
    <div className="p-16 flex flex-col gap-24 bg-sky-200 ring-1 ring-sky-300 rounded-lg">
      <div className="grid grid-cols-6 gap-16 max-sm:gap-8">
        {tiles.map((tile, index) => (
          <div key={tile.id} ref={index === 0 ? tileCardRef : undefined}>
            <TileCard tile={tile} />
          </div>
        ))}
      </div>
      <div className="flex gap-16 justify-center max-sm:gap-8">
        <div ref={operatorCardRef}>
          <OperatorCard operator="+" />
        </div>
        <OperatorCard operator="-" />
        <OperatorCard operator="*" />
        <OperatorCard operator="/" />
      </div>
    </div>
  );
}
