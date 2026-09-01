import { PlayerId } from "@dnedm/game-core";
import { v4 } from "uuid";
import { GameInstanceManager } from "../instance/game.instance.manager.js";

export class Lobby {
  public readonly id: string = v4();
  public readonly createdAt: Date = new Date();
  public owner: PlayerId;
  public readonly players: PlayerId[] = [];
  public readonly gameInstanceManager: GameInstanceManager =
    GameInstanceManager.initialize();

  constructor(owner: PlayerId) {
    this.owner = owner;
  }

  public addPlayer(playerId: PlayerId) {
    if (this.gameInstanceManager.gameInstance) {
      throw Error("Cannot add a player when a game has already started");
    }
    this.players.push(playerId);
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
  }

  public dispatchLobbyState() {}
}
