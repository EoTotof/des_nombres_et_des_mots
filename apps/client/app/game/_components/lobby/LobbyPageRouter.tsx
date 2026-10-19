import { ServerEvents, ServerPayloads } from "@dnedm/game-contracts";
import { Socket } from "socket.io-client";
import ResultPage from "./results/ResultPage";
import RoundPage from "./round/RoundPage";
import InitialLobbyPage from "./initial/InitialLobbyPage";

type LobbyPageProps = {
  socket: Socket;
  lobbyState: ServerPayloads[ServerEvents.LobbyState];
};

export default function LobbyPageRouter({
  socket,
  lobbyState,
}: LobbyPageProps) {
  if (!lobbyState.gameState) {
    return <InitialLobbyPage socket={socket} lobbyState={lobbyState} />;
  }

  if (lobbyState.gameState.currentRound) {
    return <RoundPage socket={socket} lobbyState={lobbyState} />;
  }

  return <ResultPage socket={socket} lobbyState={lobbyState} />;
}
