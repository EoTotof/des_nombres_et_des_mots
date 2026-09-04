import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ClientEvents, ServerEvents } from "@dnedm/game-contracts";
import { randomUUID } from "crypto";
import type { PlayerSocket } from "../socket/socket.types.js";
import { LobbyManager } from "./lobby/lobby.manager.js";

@WebSocketGateway({
  path: "/wsapi",
  transports: ["websocket"],
})
export class GameGateway implements OnGatewayConnection {
  @WebSocketServer()
  private readonly server!: Server;
  private readonly lobbyManager: LobbyManager;

  constructor() {
    this.lobbyManager = new LobbyManager((playerId, payload) =>
      this.server
        .to(`player:${playerId}`)
        .emit(ServerEvents.LobbyState, payload),
    );
  }

  async handleConnection(socket: PlayerSocket) {
    let playerId =
      typeof socket.handshake.auth.playerId === "string"
        ? socket.handshake.auth.playerId
        : undefined;

    if (typeof playerId === "string" && playerId !== "") {
      socket.data.playerId = playerId;
      await socket.join(`player:${playerId}`);

      const existingLobby = this.lobbyManager.findLobby(playerId);
      if (existingLobby) {
        // Reconnection, send lobby state to player to resync their client
        existingLobby.dispatchStateToPlayer(playerId);
      }
    } else {
      playerId = randomUUID();
      socket.data.playerId = playerId;
      await socket.join(`player:${playerId}`);
    }
  }

  @SubscribeMessage(ClientEvents.CreateLobby)
  onCreateLobby(socket: PlayerSocket): void {
    if (!socket.data.playerId) {
      throw Error("socket.data.playerId should be defined");
    }
    const lobby = this.lobbyManager.createLobby(socket.data.playerId);
    lobby.addPlayer(socket.data.playerId);
  }

  @SubscribeMessage(ClientEvents.Ping)
  onPing(socket: Socket): void {
    socket.emit(ServerEvents.Pong, {
      message: "pong",
    });
  }
}
