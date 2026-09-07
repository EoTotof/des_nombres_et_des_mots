import { PlayerId } from "@dnedm/game-core";
import { v4 } from "uuid";
import { GameInstanceManager } from "../instance/game.instance.manager.js";
import {
  GamePayload,
  ServerEvents,
  ServerPayloads,
} from "@dnedm/game-contracts";
import {
  getPlayerFromPlayerId,
  serializeCurrentRound,
  serializePreviousRound,
} from "../instance/serializers/game.serializers.js";
import { Player } from "./lobby.types.js";

export class Lobby {
  public readonly id: string = v4();
  public readonly createdAt: Date = new Date();
  public lastActivityAt: Date = new Date();
  public owner: PlayerId;
  public readonly players: Player[] = [];
  public readonly gameInstanceManager: GameInstanceManager;
  public readonly dispatchToPlayer: (
    playerId: PlayerId,
    payload: ServerPayloads[keyof ServerPayloads],
  ) => void;

  constructor(
    owner: Player,
    dispatchToPlayer: (
      playerId: PlayerId,
      state: ServerPayloads[ServerEvents.LobbyState],
    ) => void,
  ) {
    this.owner = owner.id;
    this.dispatchToPlayer = dispatchToPlayer;
    this.gameInstanceManager = GameInstanceManager.initialize(() =>
      this.dispatchStateToLobby(),
    );
    this.addPlayer(owner);
  }

  public addPlayer(player: Player) {
    if (this.gameInstanceManager.gameInstance) {
      throw Error("Cannot add a player when a game has already started");
    }

    if (this.players.find(({ id }) => id === player.id)) {
      // Player already in lobby
      return;
    }

    if (this.players.find(({ name }) => name === player.name)) {
      // Player with the same name already in lobby
      throw Error("Name already in use");
    }

    this.players.push(player);
    this.dispatchStateToLobby();
  }

  public removePlayer(playerId: PlayerId) {
    if (this.gameInstanceManager.gameInstance) {
      throw Error("Cannot remove a player when a game has already started");
    }

    this.players.splice(
      this.players.findIndex(({ id }) => id === playerId),
      1,
    );

    if (playerId === this.owner && this.players[0]) {
      // If owner leaves, next player in line becomes lobby owner
      this.owner = this.players[0].id;
    }

    this.dispatchStateToLobby();
  }

  public serializeLobbyState(
    playerId: PlayerId,
  ): ServerPayloads[ServerEvents.LobbyState] {
    return {
      lobbyId: this.id,
      playerId,
      parameters: this.gameInstanceManager.gameParameters,
      owner: getPlayerFromPlayerId(this.owner, this.players).name,
      players: this.players.map(({ name }) => name),
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
      currentRound: serializeCurrentRound(
        playerId,
        this.players,
        game.currentRound,
      ),
      previousRound: serializePreviousRound(this.players, game.previousRound),
    };
  }

  public dispatchStateToLobby() {
    this.lastActivityAt = new Date();

    this.players.forEach((player) => {
      this.dispatchStateToPlayer(player.id);
    });
  }

  public dispatchStateToPlayer(playerId: PlayerId) {
    this.dispatchToPlayer(playerId, this.serializeLobbyState(playerId));
  }
}
