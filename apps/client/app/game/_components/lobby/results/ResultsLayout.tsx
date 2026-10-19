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
  const currentPlayerGamePayload = gameStates[currentPlayer];

  if (!currentPlayerGamePayload) {
    throw Error("Player not found");
  }

  const currentPlayerGameState = gamePayloadParser(currentPlayerGamePayload);

  const solvedGameState = currentPlayerGameState.getSolvedGameState();

  return (
    <div className="flex flex-col gap-16 text-center text-xl md:flex-row">
      <div className="flex-1">
        <div className="mb-8">Votre réponse :</div>
        <GameStateDisplay gameState={currentPlayerGameState} />
      </div>
      <div className="flex-1">
        <div className="mb-8">Solution :</div>
        <GameStateDisplay gameState={solvedGameState} />
      </div>
    </div>
  );
}
