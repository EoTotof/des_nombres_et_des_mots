import { Module } from "@nestjs/common";
import { GameGateway } from "./game.gateway.js";
import { IsInLobbyGuard, IsLobbyOwnerGuard } from "./game.guards.js";
import { LobbyService } from "./lobby/lobby.service.js";

@Module({
  providers: [GameGateway, IsInLobbyGuard, IsLobbyOwnerGuard, LobbyService],
})
export class GameModule {}
