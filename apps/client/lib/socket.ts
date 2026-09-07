import { PlayerId } from "@dnedm/game-core";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(playerId: PlayerId | null | undefined): Socket {
  if (socket) {
    return socket;
  }

  socket = io("http://localhost:3001", {
    path: "/wsapi",
    autoConnect: false,
    transports: ["websocket"],
    auth: playerId ? { playerId } : undefined,
  });

  return socket;
}
