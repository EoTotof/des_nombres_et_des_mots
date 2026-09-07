import { ServerEvents, ServerPayloads } from "@dnedm/game-contracts";
import { useEffect } from "react";
import { getSocket } from "@/lib/socket";
import { PlayerId } from "@dnedm/game-core";

export function useSocket(
  playerId: PlayerId | null | undefined,
  setPlayerId: (playerId: PlayerId) => void,
) {
  const socket = getSocket(playerId);

  useEffect(() => {
    if (playerId) {
      return;
    }

    function onLobbyState({
      playerId,
    }: ServerPayloads[ServerEvents.LobbyState]) {
      setPlayerId(playerId);
    }

    socket.on(ServerEvents.LobbyState, onLobbyState);

    return () => {
      socket.off(ServerEvents.LobbyState, onLobbyState);
    };
  }, [playerId, setPlayerId, socket]);

  return socket;
}
