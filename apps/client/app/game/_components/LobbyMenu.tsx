import Button from "@/components/Button";
import { ClientEvents } from "@dnedm/game-contracts";
import { useState } from "react";
import { Socket } from "socket.io-client";

export default function LobbyMenu({ socket }: { socket: Socket }) {
  const [name, setName] = useState<string>("");
  const [lobbyId, setLobbyId] = useState<string>("");

  return (
    <>
      <div>
        <Button onClick={() => socket.emit(ClientEvents.Ping)}>Ping</Button>
      </div>
      <div>
        <input value={name} onChange={(event) => setName(event.target.value)} />
        <Button onClick={() => socket.emit(ClientEvents.CreateLobby, { name })}>
          Créer une partie
        </Button>
      </div>
      <div>
        <input
          value={lobbyId}
          onChange={(event) => setLobbyId(event.target.value)}
        />
        <Button
          onClick={() => socket.emit(ClientEvents.JoinLobby, { lobbyId, name })}
        >
          Rejoindre une partie
        </Button>
      </div>
    </>
  );
}
