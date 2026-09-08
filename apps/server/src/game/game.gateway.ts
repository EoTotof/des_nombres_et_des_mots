import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import {
  ClientEvents,
  ClientPayloads,
  ServerEvents,
} from "@dnedm/game-contracts";
import { randomUUID } from "crypto";
import type { PlayerSocket } from "../socket/socket.types.js";
import { LobbyManager } from "./lobby/lobby.manager.js";
import { Player } from "./lobby/lobby.types.js";

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

      const existingLobby = this.lobbyManager.findPlayerLobby(playerId);
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
  onCreateLobby(
    @ConnectedSocket() socket: PlayerSocket,
    @MessageBody() payload: ClientPayloads[ClientEvents.CreateLobby],
  ): void {
    if (!socket.data.playerId) {
      throw Error("socket.data.playerId should be defined");
    }

    const player: Player = {
      id: socket.data.playerId,
      name: payload.name,
    };

    const lobby = this.lobbyManager.createLobby(player);
    lobby.addPlayer(player);
  }

  @SubscribeMessage(ClientEvents.JoinLobby)
  onJoinLobby(
    @ConnectedSocket() socket: PlayerSocket,
    @MessageBody() payload: ClientPayloads[ClientEvents.JoinLobby],
  ): void {
    if (!socket.data.playerId) {
      throw Error("socket.data.playerId should be defined");
    }

    const player: Player = {
      id: socket.data.playerId,
      name: payload.name,
    };

    const lobby = this.lobbyManager.getLobby(payload.lobbyId);
    lobby.addPlayer(player);
  }

  @SubscribeMessage(ClientEvents.UpdateGameParameters)
  onUpdateGameParameters(
    @ConnectedSocket() socket: PlayerSocket,
    @MessageBody() payload: ClientPayloads[ClientEvents.UpdateGameParameters],
  ): void {
    if (!socket.data.playerId) {
      throw Error("socket.data.playerId should be defined");
    }

    const lobby = this.lobbyManager.findPlayerLobby(socket.data.playerId);
    if (!lobby) {
      throw Error("Player is not in a lobby");
    }
    if (lobby.owner !== socket.data.playerId) {
      throw Error("Unauthorized: player is not the owner of the lobby");
    }

    lobby.gameInstanceManager.setGameParameters(payload);
  }

  @SubscribeMessage(ClientEvents.Ping)
  onPing(socket: Socket): void {
    socket.emit(ServerEvents.Pong, {
      message: "pong",
    });
  }
}
