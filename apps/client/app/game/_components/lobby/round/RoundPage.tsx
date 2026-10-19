import { useRoundCountdown } from "@/app/game/_hooks/useRoundCountdown";
import LoadingScreen from "@/components/LoadingScreen";
import {
  CurrentRoundPayload,
  ServerEvents,
  ServerPayloads,
} from "@dnedm/game-contracts";
import { useCallback, useState } from "react";
import { Socket } from "socket.io-client";
import NumbersRound from "./NumbersRound";
import WordsRound from "./WordsRound";

type RoundPageProps = {
  socket: Socket;
  lobbyState: ServerPayloads[ServerEvents.LobbyState];
};

export default function RoundPage({ socket, lobbyState }: RoundPageProps) {
  if (!lobbyState.gameState?.currentRound) {
    throw Error("gameState.currentRound should be defined");
  }

  const [showLoadingScreen, setShowLoadingScreen] = useState<boolean>(false);

  const roundCountdown = useRoundCountdown(
    useCallback(() => lobbyState.roundEndsAt, [lobbyState]),
    useCallback(() => setShowLoadingScreen(true), []),
    useCallback(() => setShowLoadingScreen(false), []),
  );

  const roundNumber = lobbyState.gameState.pastRoundScores.length + 1;
  const lastRoundNumber = lobbyState.parameters.roundCount;

  return (
    <>
      {showLoadingScreen && <LoadingScreen />}
      <div>
        Manche {roundNumber} / {lastRoundNumber}
      </div>
      <Round
        payload={lobbyState.gameState.currentRound}
        socket={socket}
        timer={roundCountdown[0]}
        maxTime={lobbyState.parameters.roundDuration}
      />
    </>
  );
}

function Round({
  payload,
  socket,
  timer,
  maxTime,
}: {
  payload: CurrentRoundPayload;
  socket: Socket;
  timer: number | null;
  maxTime: number;
}) {
  switch (payload.type) {
    case "numbers":
      return (
        <NumbersRound
          payload={payload}
          socket={socket}
          timer={timer}
          maxTime={maxTime}
        />
      );
    case "words":
      return (
        <WordsRound
          payload={payload}
          socket={socket}
          timer={timer}
          maxTime={maxTime}
        />
      );
  }
}
