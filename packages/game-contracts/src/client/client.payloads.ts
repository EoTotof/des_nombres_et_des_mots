import { ClientEvents } from "./client.events.js";

export type ClientPayloads = {
  [ClientEvents.JoinLobby]: {
    lobbyId: string;
  };
};
