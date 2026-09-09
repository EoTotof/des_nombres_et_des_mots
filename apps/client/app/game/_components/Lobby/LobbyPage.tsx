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

type LobbyPageProps = {
  socket: Socket;
  lobbyState: ServerPayloads[ServerEvents.LobbyState];
};

export default function LobbyPage({ socket, lobbyState }: LobbyPageProps) {
  const isLobbyOwner = lobbyState.playerName === lobbyState.owner;
  function updateParameters(parameters: GameParametersT) {
    socket.emit(ClientEvents.UpdateGameParameters, parameters);
  }

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
        return <NumbersRound payload={currentRound} />;
      case "words":
        return <WordsRound payload={currentRound} />;
    }
  }
}
