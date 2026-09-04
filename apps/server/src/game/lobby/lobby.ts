import { PlayerId } from "@dnedm/game-core";
import { v4 } from "uuid";
import { GameInstanceManager } from "../instance/game.instance.manager.js";
import {
  GamePayload,
  ServerEvents,
  ServerPayloads,
} from "@dnedm/game-contracts";
import {
  serializeCurrentRound,
  serializePreviousRound,
} from "../instance/serializers/game.serializers.js";

export class Lobby {
  public readonly id: string = v4();
  public readonly createdAt: Date = new Date();
  public lastActivityAt: Date = new Date();
  public owner: PlayerId;
  public readonly players: PlayerId[] = [];
  public readonly gameInstanceManager: GameInstanceManager;
  public readonly dispatchToPlayer: (
    playerId: PlayerId,
    payload: ServerPayloads[keyof ServerPayloads],
  ) => void;

  constructor(
    owner: PlayerId,
    dispatchToPlayer: (
      playerId: PlayerId,
      state: ServerPayloads[ServerEvents.LobbyState],
    ) => void,
  ) {
    this.owner = owner;
    this.dispatchToPlayer = dispatchToPlayer;
    this.gameInstanceManager = GameInstanceManager.initialize(() =>
      this.dispatchStateToLobby(),
    );
    this.addPlayer(owner);
  }

  public addPlayer(playerId: PlayerId) {
    if (this.gameInstanceManager.gameInstance) {
      throw Error("Cannot add a player when a game has already started");
    }

    if (!this.players.includes(playerId)) {
      this.players.push(playerId);
    }
    this.dispatchStateToLobby();
  }

  public removePlayer(playerId: PlayerId) {
    if (this.gameInstanceManager.gameInstance) {
      throw Error("Cannot remove a player when a game has already started");
    }

    this.players.splice(
      this.players.findIndex((id) => id === playerId),
      1,
    );

    if (playerId === this.owner && this.players[0]) {
      // If owner leaves, next player in line becomes lobby owner
      this.owner = this.players[0];
    }
    this.dispatchStateToLobby();
  }

  public serializeLobbyState(
    playerId: PlayerId,
  ): ServerPayloads[ServerEvents.LobbyState] {
    return {
      parameters: this.gameInstanceManager.gameParameters,
      owner: this.owner,
      players: this.players,
      gameState: this.serializeGameState(playerId),
    };
  }

  private serializeGameState(playerId: PlayerId): GamePayload | null {
    if (!this.gameInstanceManager.gameInstance) {
      return null;
    }

    const game = this.gameInstanceManager.gameInstance;
    return {
      pastRoundScores: game.pastRoundScores,
      currentRound: serializeCurrentRound(playerId, game.currentRound),
      previousRound: serializePreviousRound(game.previousRound),
    };
  }

  public dispatchStateToLobby() {
    this.lastActivityAt = new Date();

    this.players.forEach((playerId) => {
      this.dispatchStateToPlayer(playerId);
    });
  }

  public dispatchStateToPlayer(playerId: PlayerId) {
    this.dispatchToPlayer(playerId, this.serializeLobbyState(playerId));
  }
}
