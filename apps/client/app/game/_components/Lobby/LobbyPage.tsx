import { GameParameters as GameParametersT } from "@dnedm/game-core";
import GameParameters from "./GameParameters";
import {
  ClientEvents,
  ServerEvents,
  ServerPayloads,
} from "@dnedm/game-contracts";
import { Socket } from "socket.io-client";

type LobbyPageProps = {
  socket: Socket;
  lobbyState: ServerPayloads[ServerEvents.LobbyState];
};

export default function LobbyPage({ socket, lobbyState }: LobbyPageProps) {
  function updateParameters(parameters: GameParametersT) {
    socket.emit(ClientEvents.UpdateGameParameters, parameters);
  }

  return (
    <div>
      <div>Paramètres</div>
      <GameParameters
        parameters={lobbyState.parameters}
        setParameters={updateParameters}
        disabled={lobbyState.playerName !== lobbyState.owner}
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
    </div>
  );
}
