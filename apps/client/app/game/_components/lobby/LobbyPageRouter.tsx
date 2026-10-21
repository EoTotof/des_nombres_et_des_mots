import ResultPage from "./results/ResultPage";
import RoundPage from "./round/RoundPage";
import InitialLobbyPage from "./initial/InitialLobbyPage";
import { useLobbyContext } from "../../_contexts/lobbyContext";

export default function LobbyPageRouter() {
  const { lobbyState } = useLobbyContext();

  if (!lobbyState.gameState) {
    return <InitialLobbyPage />;
  }

  if (lobbyState.gameState.currentRound) {
    return <RoundPage />;
  }

  return <ResultPage />;
}
