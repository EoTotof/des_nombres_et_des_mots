import { GameParameters, PlayerId } from "@dnedm/game-core";
import { ServerEvents } from "./server.events.js";
import { GamePayload } from "../shared/game.payloads.js";

export type ServerPayloads = {
  [ServerEvents.LobbyState]: {
    parameters: GameParameters;
    owner: PlayerId;
    players: PlayerId[];
    gameState: GamePayload | null;
  };
};
