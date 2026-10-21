import { ClientEvents } from "./client.events.js";
import { ClientPayloads } from "./client.payloads.js";

export interface ClientToServerEvents {
  [ClientEvents.Ping]: () => void;
  [ClientEvents.CreateLobby]: (
    payload: ClientPayloads[ClientEvents.CreateLobby],
  ) => void;
  [ClientEvents.JoinLobby]: (
    payload: ClientPayloads[ClientEvents.JoinLobby],
  ) => void;
  [ClientEvents.LeaveLobby]: () => void;
  [ClientEvents.UpdateGameParameters]: (
    payload: ClientPayloads[ClientEvents.UpdateGameParameters],
  ) => void;
  [ClientEvents.StartGame]: () => void;
  [ClientEvents.PushMove]: (
    payload: ClientPayloads[ClientEvents.PushMove],
  ) => void;
  [ClientEvents.UndoMove]: (
    payload: ClientPayloads[ClientEvents.UndoMove],
  ) => void;
  [ClientEvents.StartNextRound]: () => void;
}
