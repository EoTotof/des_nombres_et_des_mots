import { Injectable } from "@nestjs/common";
import { LobbyManager } from "./lobby.manager.js";
import { PlayerId } from "@dnedm/game-core";
import { ServerPayloads } from "@dnedm/game-contracts";

@Injectable()
export class LobbyService {
  private lobbyManager: LobbyManager | null = null;

  initialize(
    dispatchToPlayer: (
      playerId: PlayerId,
      payload: ServerPayloads[keyof ServerPayloads],
    ) => void,
  ) {
    if (this.lobbyManager) {
      throw new Error("LobbyService is already initialized");
    }

    this.lobbyManager = new LobbyManager(dispatchToPlayer);
  }

  get manager(): LobbyManager {
    if (!this.lobbyManager) {
      throw new Error("LobbyService has not been initialized");
    }

    return this.lobbyManager;
  }
}
