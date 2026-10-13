import { GameParameters as GameParametersT } from "@dnedm/game-core";
import GameParameters from "./GameParameters";
import {
  ClientEvents,
  ServerEvents,
  ServerPayloads,
} from "@dnedm/game-contracts";
import { Socket } from "socket.io-client";
import Button from "@/components/Button";
import NumbersRound from "./Round/NumbersRound";
import WordsRound from "./Round/WordsRound";
import { useCountdown } from "@/hooks/useCountdown";
import { useCallback, useEffect, useRef, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Leaderboard from "./Leaderboard";
import { useRoundCountdown } from "../../_hooks/useRoundCountdown";

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
      <div>
        <div>Paramètres</div>
        <GameParameters
          parameters={lobbyState.parameters}
          setParameters={updateParameters}
          disabled={!isLobbyOwner}
        />
        <div>
          <div>lobby ID: {lobbyState.lobbyId}</div>
          <div>lobby owner: {lobbyState.owner}</div>
          <div>
            <ul>
              {lobbyState.players.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
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
      <Leaderboard
        title="Scores"
        scores={lobbyState.gameState.pastRoundScores}
      />
      {resultCountdown[0] !== null ? (
        <>Prochaine manche dans {resultCountdown[0]} secondes</>
      ) : null}
    </>
  );
}
