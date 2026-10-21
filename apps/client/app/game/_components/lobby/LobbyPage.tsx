import {
  ClientEvents,
  ServerEvents,
  ServerPayloads,
} from "@dnedm/game-contracts";
import { Socket } from "socket.io-client";
import LobbyPageRouter from "./LobbyPageRouter";
import { LobbyContext } from "../../_contexts/lobbyContext";
import { useState } from "react";
import LeaveLobbyDialog from "./_components/LeaveLobbyDialog";

type LobbyPageProps = {
  socket: Socket;
  lobbyState: NonNullable<ServerPayloads[ServerEvents.LobbyState]>;
};

export default function LobbyPage({ socket, lobbyState }: LobbyPageProps) {
  const [isLeaving, setIsLeaving] = useState<boolean>(false);

  return (
    <LobbyContext
      value={{ socket, lobbyState, onLeave: () => setIsLeaving(true) }}
    >
      <LobbyPageRouter />
      {isLeaving ? (
        <LeaveLobbyDialog
          onClose={() => setIsLeaving(false)}
          onLeave={() => socket.emit(ClientEvents.LeaveLobby)}
        />
      ) : null}
    </LobbyContext>
  );
}
