import { ServerEvents } from "@dnedm/game-contracts";
import { io, Socket } from "socket.io-client";

export const socket: Socket = io("http://localhost:3001", {
  path: "/wsapi",
  autoConnect: false,
  transports: ["websocket"],
});

socket.on(ServerEvents.Pong, () => window.alert("pong"));
