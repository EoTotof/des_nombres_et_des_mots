import { GameParameters, PlayerId } from "@dnedm/game-core";
import { ServerEvents } from "./server.events.js";
import { GamePayload } from "../shared/game.payloads.js";

export type ServerPayloads = {
  [ServerEvents.LobbyState]: {
    lobbyId: string;
    playerId: PlayerId;
    parameters: GameParameters;
    owner: PlayerId;
    players: string[]; // IDs are private, these are the players' names
    gameState: GamePayload | null;
  };
};
