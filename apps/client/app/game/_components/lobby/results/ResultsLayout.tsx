import Button from "@/components/Button";
import clsx from "clsx";
import { MoveLeft, MoveRight } from "lucide-react";
import { useState } from "react";

export default function ResultsLayout<
  GamePayload,
  GameState extends { getSolvedGameState: () => GameState },
>({
  gameStates,
  gamePayloadParser,
  currentPlayer,
  GameStateDisplay,
}: {
  gameStates: Record<string, GamePayload>;
  gamePayloadParser: (payload: GamePayload) => GameState;
  currentPlayer: string;
  GameStateDisplay: (props: { gameState: GameState }) => React.ReactNode;
}) {
  const [index, setIndex] = useState<number>(0);

  const { [currentPlayer]: currentPlayerGamePayload, ...otherGameStates } =
    gameStates;

  if (!currentPlayerGamePayload) {
    throw Error("Player not found");
  }

  const currentPlayerGameState = gamePayloadParser(currentPlayerGamePayload);

  const solvedGameState = currentPlayerGameState.getSolvedGameState();

  const gameStatesDisplay: [string, GameState][] = [
    ["Votre réponse", currentPlayerGameState],
    ...Object.entries(otherGameStates).map(([player, gameState]) => {
      const display: [string, GameState] = [
        `Réponse de ${player}`,
        gamePayloadParser(gameState),
      ];
      return display;
    }),
  ];

  return (
    <div className="flex flex-col gap-32 text-center text-xl md:flex-row">
      {gameStatesDisplay[index] ? (
        <div className="flex-1">
          <div className="flex-1 flex items-center gap-16 justify-center mb-8">
            {gameStatesDisplay.length > 1 ? (
              <div className="h-56 flex">
                <Button
                  onClick={() => setIndex((index) => Math.max(index - 1, 0))}
                  disabled={index === 0}
                >
                  <MoveLeft />
                </Button>
              </div>
            ) : null}
            <div>{gameStatesDisplay[index][0]} :</div>
            {gameStatesDisplay.length > 1 ? (
              <div className="h-56 flex">
                <Button
                  onClick={() =>
                    setIndex((index) =>
                      Math.min(
                        index + 1,
                        Object.keys(gameStatesDisplay).length - 1,
                      ),
                    )
                  }
                  disabled={index === Object.keys(gameStatesDisplay).length - 1}
                >
                  <MoveRight />
                </Button>
              </div>
            ) : null}
          </div>
          <GameStateDisplay gameState={gameStatesDisplay[index][1]} />
        </div>
      ) : null}
      <div className="flex-1">
        <div
          className={clsx("mb-8", gameStatesDisplay.length > 1 ? "h-56" : null)}
        >
          Solution :
        </div>
        <GameStateDisplay gameState={solvedGameState} />
      </div>
    </div>
  );
}
