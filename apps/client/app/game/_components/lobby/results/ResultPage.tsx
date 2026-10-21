import { ClientEvents } from "@dnedm/game-contracts";
import Leaderboard from "./Leaderboard";
import NumbersResults from "./NumbersResults";
import WordsResults from "./WordsResults";
import { useRoundCountdown } from "@/app/game/_hooks/useRoundCountdown";
import { useCallback, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Button from "@/components/Button";
import { useLobbyContext } from "@/app/game/_contexts/lobbyContext";

export default function ResultPage() {
  const { socket, lobbyState } = useLobbyContext();

  if (!lobbyState.gameState) {
    throw Error("gameState should be defined");
  }

  const [showLoadingScreen, setShowLoadingScreen] = useState<boolean>(false);

  const resultCountdown = useRoundCountdown(
    useCallback(() => lobbyState.nextRoundStartsAt, [lobbyState]),
    useCallback(() => setShowLoadingScreen(true), []),
    useCallback(() => setShowLoadingScreen(false), []),
  );

  const isLobbyOwner = lobbyState.playerName === lobbyState.owner;

  const roundNumber = lobbyState.gameState.pastRoundScores.length + 1;

  return (
    <>
      {showLoadingScreen && <LoadingScreen />}
      <div className="mb-8 text-2xl font-semibold">
        Résultats de la manche {roundNumber}
      </div>
      {lobbyState.gameState.previousRound?.type === "numbers" ? (
        <NumbersResults
          payload={lobbyState.gameState.previousRound}
          currentPlayer={lobbyState.playerName}
        />
      ) : null}
      {lobbyState.gameState.previousRound?.type === "words" ? (
        <WordsResults
          payload={lobbyState.gameState.previousRound}
          currentPlayer={lobbyState.playerName}
        />
      ) : null}
      <Leaderboard
        title="Scores"
        scores={lobbyState.gameState.pastRoundScores}
        withTransition
      />
      {resultCountdown[0] !== null ? (
        <>
          <div>Prochaine manche dans {resultCountdown[0]} secondes</div>
          {isLobbyOwner ? (
            <Button onClick={() => socket.emit(ClientEvents.StartNextRound)}>
              Continuer maintenant
            </Button>
          ) : null}
        </>
      ) : null}
    </>
  );
}
