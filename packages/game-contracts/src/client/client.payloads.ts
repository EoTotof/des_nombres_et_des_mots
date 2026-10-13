import { GameParameters } from "@dnedm/game-core";
import { ClientEvents } from "./client.events.js";
import { MovePayload } from "../shared/game.payloads.js";
import z from "zod";
import { createLobbySchema, joinLobbySchema } from "./client.schemas.js";

export type ClientPayloads = {
  [ClientEvents.CreateLobby]: z.infer<typeof createLobbySchema>;
  [ClientEvents.JoinLobby]: z.infer<typeof joinLobbySchema>;
  [ClientEvents.UpdateGameParameters]: GameParameters;
  [ClientEvents.PushMove]: MovePayload;
  [ClientEvents.UndoMove]: { moveId: string };
};
