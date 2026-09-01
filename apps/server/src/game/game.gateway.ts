import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { ClientEvents, ServerEvents } from "@dnedm/game-contracts";
import { randomUUID } from "crypto";
import { PlayerSocket } from "../socket/socket.types.js";

@WebSocketGateway({
  path: "/wsapi",
  transports: ["websocket"],
})
export class GameGateway implements OnGatewayConnection {
  handleConnection(socket: PlayerSocket) {
    const playerId =
      typeof socket.handshake.auth.playerId === "string"
        ? socket.handshake.auth.playerId
        : undefined;

    if (typeof playerId === "string" && playerId !== "") {
      socket.data.playerId = playerId;
      // Try to find a lobby with playerId
      // If found, handle reconnection: add socket to lobby's room, emit game state event
    } else {
      socket.data.playerId = randomUUID();
    }
  }

  @SubscribeMessage(ClientEvents.Ping)
  onPing(socket: Socket): void {
    socket.emit(ServerEvents.Pong, {
      message: "pong",
    });
  }
}
