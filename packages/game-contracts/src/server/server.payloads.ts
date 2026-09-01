import { GameParameters, PlayerId } from "@dnedm/game-core";
import { ServerEvents } from "./server.events.js";

export type ServerPayloads = {
  [ServerEvents.LobbyState]: {
    parameters: GameParameters;
    owner: PlayerId;
    players: PlayerId[];
    //gameInstance: GameState | null;
  };
};
