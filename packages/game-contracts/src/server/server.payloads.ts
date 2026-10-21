import { GameParameters, PlayerId } from "@dnedm/game-core";
import { ServerEvents } from "./server.events.js";
import { GamePayload } from "../shared/game.payloads.js";

export type ServerPayloads = {
  [ServerEvents.LobbyState]: {
    lobbyId: string;
    playerId: PlayerId;
    playerName: string;
    parameters: GameParameters;
    owner: string;
    players: string[]; // IDs are private, these are the players' names
    gameState: GamePayload | null;
    roundEndsAt: number | null;
    nextRoundStartsAt: number | null;
  } | null;
};
