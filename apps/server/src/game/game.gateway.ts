import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { WsException } from "@nestjs/websockets";
import { StandardSchemaValidationPipe } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import {
  ClientEvents,
  ClientPayloads,
  createLobbySchema,
  joinLobbySchema,
  ServerEvents,
} from "@dnedm/game-contracts";
import { randomUUID } from "crypto";
import type { PlayerSocket } from "../socket/socket.types.js";
import { UseGuards, UsePipes } from "@nestjs/common";
import { IsInLobbyGuard, IsLobbyOwnerGuard } from "./game.guards.js";
import { LobbyService } from "./lobby/lobby.service.js";
import { Player } from "@dnedm/game-core";

@UsePipes(
  new StandardSchemaValidationPipe({
    exceptionFactory: (issues) => new WsException(issues),
  }),
)
@WebSocketGateway({
  path: "/wsapi",
  transports: ["websocket"],
})
export class GameGateway implements OnGatewayConnection, OnGatewayInit {
  @WebSocketServer()
  private readonly server!: Server;

  constructor(private readonly lobbyService: LobbyService) {}

  afterInit() {
    this.lobbyService.initialize((playerId, payload) => {
      this.server
        .to(`player:${playerId}`)
        .emit(ServerEvents.LobbyState, payload);
    });
  }

  async handleConnection(socket: PlayerSocket) {
    let playerId =
      typeof socket.handshake.auth.playerId === "string"
        ? socket.handshake.auth.playerId
        : undefined;

    if (typeof playerId === "string" && playerId !== "") {
      socket.data.playerId = playerId;
      await socket.join(`player:${playerId}`);

      const existingLobby = this.lobbyService.manager.findPlayerLobby(playerId);
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
    @MessageBody({ schema: createLobbySchema })
    payload: ClientPayloads[ClientEvents.CreateLobby],
  ): void {
    if (!socket.data.playerId) {
      throw new WsException("socket.data.playerId should be defined");
    }

    const player: Player = {
      id: socket.data.playerId,
      name: payload.name,
    };

    this.lobbyService.manager.createLobby(player);
  }

  @SubscribeMessage(ClientEvents.JoinLobby)
  onJoinLobby(
    @ConnectedSocket() socket: PlayerSocket,
    @MessageBody({ schema: joinLobbySchema })
    payload: ClientPayloads[ClientEvents.JoinLobby],
  ): void {
    if (!socket.data.playerId) {
      throw new WsException("socket.data.playerId should be defined");
    }

    const player: Player = {
      id: socket.data.playerId,
      name: payload.name,
    };

    this.lobbyService.manager.joinLobby(player, payload.lobbyId);
  }

  @UseGuards(IsInLobbyGuard)
  @SubscribeMessage(ClientEvents.LeaveLobby)
  onLeaveLobby(@ConnectedSocket() socket: PlayerSocket): void {
    const lobby = this.lobbyService.manager.findPlayerLobby(
      socket.data.playerId!,
    );

    this.lobbyService.manager.leaveLobby(socket.data.playerId!, lobby!.id);
    socket.emit(ServerEvents.LobbyState, null);
  }

  @UseGuards(IsLobbyOwnerGuard)
  @SubscribeMessage(ClientEvents.UpdateGameParameters)
  onUpdateGameParameters(
    @ConnectedSocket() socket: PlayerSocket,
    @MessageBody() payload: ClientPayloads[ClientEvents.UpdateGameParameters],
  ): void {
    const lobby = this.lobbyService.manager.findPlayerLobby(
      socket.data.playerId!,
    );
    lobby!.updateGameParameters(payload);
  }

  @UseGuards(IsLobbyOwnerGuard)
  @SubscribeMessage(ClientEvents.StartGame)
  onStartGame(@ConnectedSocket() socket: PlayerSocket): void {
    const lobby = this.lobbyService.manager.findPlayerLobby(
      socket.data.playerId!,
    );
    lobby!.startGame();
  }

  @UseGuards(IsInLobbyGuard)
  @SubscribeMessage(ClientEvents.PushMove)
  onPushMove(
    @ConnectedSocket() socket: PlayerSocket,
    @MessageBody() payload: ClientPayloads[ClientEvents.PushMove],
  ): void {
    const lobby = this.lobbyService.manager.findPlayerLobby(
      socket.data.playerId!,
    );

    lobby!.pushMove(socket.data.playerId!, payload);
  }

  @UseGuards(IsInLobbyGuard)
  @SubscribeMessage(ClientEvents.UndoMove)
  onUndoMove(
    @ConnectedSocket() socket: PlayerSocket,
    @MessageBody() payload: ClientPayloads[ClientEvents.UndoMove],
  ): void {
    const lobby = this.lobbyService.manager.findPlayerLobby(
      socket.data.playerId!,
    );

    lobby!.undoMove(socket.data.playerId!, payload.moveId);
  }

  @UseGuards(IsLobbyOwnerGuard)
  @SubscribeMessage(ClientEvents.StartNextRound)
  onStartNextRound(@ConnectedSocket() socket: PlayerSocket): void {
    const lobby = this.lobbyService.manager.findPlayerLobby(
      socket.data.playerId!,
    );
    lobby!.startNextRound();
  }

  @SubscribeMessage(ClientEvents.Ping)
  onPing(socket: Socket): void {
    socket.emit(ServerEvents.Pong, {
      message: "pong",
    });
  }
}
