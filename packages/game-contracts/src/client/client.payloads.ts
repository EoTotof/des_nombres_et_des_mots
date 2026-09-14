import { GameParameters } from "@dnedm/game-core";
import { ClientEvents } from "./client.events.js";
import { MovePayload } from "../shared/game.payloads.js";

export type ClientPayloads = {
  [ClientEvents.CreateLobby]: {
    name: string;
  };
  [ClientEvents.JoinLobby]: {
    lobbyId: string;
    name: string;
  };
  [ClientEvents.UpdateGameParameters]: GameParameters;
  [ClientEvents.PushMove]: MovePayload;
  [ClientEvents.UndoMove]: { moveId: string };
};
