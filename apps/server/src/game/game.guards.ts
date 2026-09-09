import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { PlayerSocket } from "../socket/socket.types.js";
import { LobbyService } from "./lobby/lobby.service.js";

@Injectable()
export class IsInLobbyGuard implements CanActivate {
  constructor(private readonly lobbyService: LobbyService) {}

  canActivate(context: ExecutionContext): boolean {
    const socket = context.switchToWs().getClient<PlayerSocket>();
    const playerId = socket.data.playerId;

    if (!playerId) {
      throw new WsException("Player is not identified");
    }

    const lobby = this.lobbyService.manager.findPlayerLobby(playerId);

    if (!lobby) {
      throw new WsException("Player is not in a lobby");
    }

    return true;
  }
}

@Injectable()
export class IsLobbyOwnerGuard implements CanActivate {
  constructor(private readonly lobbyService: LobbyService) {}

  canActivate(context: ExecutionContext): boolean {
    const socket = context.switchToWs().getClient<PlayerSocket>();
    const playerId = socket.data.playerId;

    if (!playerId) {
      throw new WsException("Player is not identified");
    }

    const lobby = this.lobbyService.manager.findPlayerLobby(playerId);

    if (!lobby) {
      throw new WsException("Player is not in a lobby");
    }

    if (lobby.owner !== playerId) {
      throw new WsException("Player is not the lobby owner");
    }

    return true;
  }
}
