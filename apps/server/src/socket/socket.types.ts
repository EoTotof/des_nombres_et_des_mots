import { DefaultEventsMap, Socket } from "socket.io";
import { PlayerId } from "@dnedm/game-core";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@dnedm/game-contracts";

export type PlayerSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  DefaultEventsMap,
  {
    playerId?: PlayerId;
  }
>;
