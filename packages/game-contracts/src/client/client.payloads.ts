import { ClientEvents } from "./client.events.js";

export type ClientPayloads = {
  [ClientEvents.CreateLobby]: {
    name: string;
  };
  [ClientEvents.JoinLobby]: {
    lobbyId: string;
    name: string;
  };
};
