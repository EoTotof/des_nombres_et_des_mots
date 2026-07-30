import TargetCard from "@/components/numbers/cards/TargetCard";
import { GameState } from "@dnedm/game-core";
import TilePool from "./interface/TilePool";
import {
  NumbersGameContext,
  CardSize,
  NumbersGameContextT,
} from "@/app/numbers/context";
import { useMemo, useState } from "react";
import Move from "./interface/Move";

type GameInterfaceProps = {
  gameState: GameState;
};

export default function GameInterface({ gameState }: GameInterfaceProps) {
  const [tileCardSize, setTileCardSize] = useState<CardSize>({
    width: 0,
    height: 0,
  });

  const [operatorCardSize, setOperatorCardSize] = useState<CardSize>({
    width: 0,
    height: 0,
  });

  const numbersGameContextValue: NumbersGameContextT = useMemo(
    () => ({
      tileCardSize,
      setTileCardSize,
      operatorCardSize,
      setOperatorCardSize,
    }),
    [operatorCardSize, tileCardSize],
  );

  return (
    <NumbersGameContext value={numbersGameContextValue}>
      <div className="flex-1 mx-auto container pt-16 px-16 gap-32 flex">
        <main className="flex-1 flex flex-col gap-32">
          <TilePool tiles={gameState.allTiles} />
          <Move
            leftTile={null}
            operator={null}
            rightTile={null}
            resultTile={null}
            isValid
          />
          {gameState.operations.map(
            ({ left, operator, right, result, isValid }) => (
              <Move
                key={`${left.id}${operator}${right.id}`}
                leftTile={left}
                operator={operator}
                rightTile={right}
                resultTile={result}
                isValid={isValid}
              />
            ),
          )}
        </main>
        <aside className="w-3xs max-lg:w-192">
          <TargetCard targetValue={gameState.targetNumber} />
        </aside>
      </div>
    </NumbersGameContext>
  );
}
