import Button from "@/components/Button";
import Input from "@/components/inputs/Input";
import { ClientEvents } from "@dnedm/game-contracts";
import { useState } from "react";
import { Socket } from "socket.io-client";
import { useSearchParams } from "next/navigation";

export default function GameMenu({ socket }: { socket: Socket }) {
  const searchParams = useSearchParams();

  const [name, setName] = useState<string>("");
  const [lobbyId, setLobbyId] = useState<string>(
    searchParams.get("uuid") || "",
  );

  return (
    <div className="flex flex-col gap-16">
      <div className="flex items-end gap-16">
        <Input
          label="Pseudo"
          value={name}
          onValueChange={setName}
          placeholder="Pseudo"
        />
        <Button onClick={() => socket.emit(ClientEvents.CreateLobby, { name })}>
          Créer une partie
        </Button>
      </div>
      <div className="flex items-end gap-16">
        <Input
          label="ID de la partie"
          value={lobbyId}
          onValueChange={setLobbyId}
          placeholder="123e4567-e89b-12d3-a456-426614174000"
        />
        <Button
          onClick={() => socket.emit(ClientEvents.JoinLobby, { lobbyId, name })}
        >
          Rejoindre une partie
        </Button>
      </div>
    </div>
  );
}
