import { ClientEvents } from "./client.events.js";

export interface ClientToServerEvents {
  [ClientEvents.Ping]: () => void;
  [ClientEvents.CreateLobby]: () => void;
}
