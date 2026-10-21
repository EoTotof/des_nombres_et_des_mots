import { ServerEvents, ServerPayloads } from "@dnedm/game-contracts";
import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

export type LobbyContextT = {
  socket: Socket;
  lobbyState: NonNullable<ServerPayloads[ServerEvents.LobbyState]>;
  onLeave: () => void;
};

export const LobbyContext = createContext<LobbyContextT | null>(null);

export function useLobbyContext() {
  const context = useContext(LobbyContext);

  if (!context) {
    throw new Error("LobbyContext called outside of provider");
  }

  return context;
}
