import { ServerEvents } from "./server.events.js";
import { ServerPayloads } from "./server.payloads.js";

export interface ServerToClientEvents {
  [ServerEvents.Pong]: () => void;
  [ServerEvents.LobbyState]: (
    payload: ServerPayloads[ServerEvents.LobbyState],
  ) => void;
}
