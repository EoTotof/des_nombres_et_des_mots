import { ClientEvents } from "./client.events.js";
import { ClientPayloads } from "./client.payloads.js";

export interface ClientToServerEvents {
  [ClientEvents.Ping]: () => void;
  [ClientEvents.CreateLobby]: (
    payload: ClientPayloads[ClientEvents.CreateLobby],
  ) => void;
  [ClientEvents.UpdateGameParameters]: (
    payload: ClientPayloads[ClientEvents.UpdateGameParameters],
  ) => void;
}
