import { GameParameters as GameParametersT } from "@dnedm/game-core";
import GameParameters from "./GameParameters";
import {
  ClientEvents,
  ServerEvents,
  ServerPayloads,
} from "@dnedm/game-contracts";
import { Socket } from "socket.io-client";
import Button from "@/components/Button";
import NumbersRound from "./round/NumbersRound";
import WordsRound from "./round/WordsRound";
import { useCallback, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Leaderboard from "./results/Leaderboard";
import { useRoundCountdown } from "../../_hooks/useRoundCountdown";
import NumbersResults from "./results/NumbersResults";
import WordsResults from "./results/WordsResults";
import Input from "@/components/inputs/Input";
import { Copy } from "lucide-react";

type LobbyPageProps = {
  socket: Socket;
  lobbyState: ServerPayloads[ServerEvents.LobbyState];
};

export default function LobbyPage({ socket, lobbyState }: LobbyPageProps) {
  const isLobbyOwner = lobbyState.playerName === lobbyState.owner;
  function updateParameters(parameters: GameParametersT) {
    socket.emit(ClientEvents.UpdateGameParameters, parameters);
  }

  // TODO handle loading screen better
  const [showLoadingScreen, setShowLoadingScreen] = useState<boolean>(false);

  const roundCountdown = useRoundCountdown(
    useCallback(() => lobbyState.roundEndsAt, [lobbyState]),
    useCallback(() => setShowLoadingScreen(true), []),
    useCallback(() => setShowLoadingScreen(false), []),
  );

  const resultCountdown = useRoundCountdown(
    useCallback(() => lobbyState.nextRoundStartsAt, [lobbyState]),
    useCallback(() => setShowLoadingScreen(true), []),
    useCallback(() => setShowLoadingScreen(false), []),
  );

  if (!lobbyState.gameState) {
    return (
      <div className="flex flex-col gap-16">
        <div>
          <div className="mb-4 text-2xl font-semibold">Inviter des joueurs</div>
          <div className="flex items-center gap-8">
            <Input
              value={`${window.location.origin}/game?uuid=${lobbyState.lobbyId}`}
            />
            <Button>
              <Copy />
            </Button>
          </div>
        </div>
        <div>
          <div className="mb-4 text-2xl font-semibold">Paramètres</div>
          <GameParameters
            parameters={lobbyState.parameters}
            setParameters={updateParameters}
            disabled={!isLobbyOwner}
          />
        </div>
        <div>
          <div className="text-2xl font-semibold">Joueurs</div>
          <ul>
            {lobbyState.players.map((name) => (
              <li key={name} className="text-lg">
                {name}
              </li>
            ))}
          </ul>
        </div>
        {isLobbyOwner ? (
          <Button onClick={() => socket.emit(ClientEvents.StartGame)}>
            Démarrer la partie
          </Button>
        ) : null}
      </div>
    );
  }

  if (lobbyState.gameState.currentRound) {
    const currentRound = lobbyState.gameState.currentRound;
    switch (currentRound.type) {
      case "numbers":
        return (
          <>
            {showLoadingScreen && <LoadingScreen />}
            <NumbersRound
              payload={currentRound}
              socket={socket}
              timer={roundCountdown[0]}
              maxTime={lobbyState.parameters.roundDuration}
            />
          </>
        );
      case "words":
        return (
          <>
            {showLoadingScreen && <LoadingScreen />}
            <WordsRound
              payload={currentRound}
              socket={socket}
              timer={roundCountdown[0]}
              maxTime={lobbyState.parameters.roundDuration}
            />
          </>
        );
    }
  }

  return (
    <>
      {showLoadingScreen && <LoadingScreen />}
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
