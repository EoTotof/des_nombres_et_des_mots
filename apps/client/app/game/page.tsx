"use client";

import { ServerEvents, ServerPayloads } from "@dnedm/game-contracts";
import { useLocalStorageValue } from "@react-hookz/web";
import { PlayerId } from "@dnedm/game-core";
import { useSocket } from "./_hooks/useSocket";
import { useEffect, useState } from "react";
import GameMenu from "./_components/GameMenu";
import LobbyPage from "./_components/lobby/LobbyPage";

export default function Game() {
  const { value: playerId, set: setPlayerId } =
    useLocalStorageValue<PlayerId | null>("player_id", {
      defaultValue: null,
      initializeWithValue: true,
    });

  const [connected, setConnected] = useState<boolean>(false);

  const [lobbyState, setLobbyState] = useState<
    ServerPayloads[ServerEvents.LobbyState] | null
  >(null);

  const socket = useSocket(playerId, setPlayerId);

  useEffect(() => {
    const onConnect = () => setConnected(true);
    socket.on("connect", onConnect);

    const onDisconnect = () => setConnected(false);
    socket.on("disconnect", onDisconnect);

    if (!socket.connected) {
      socket.connect();
    }

    function onLobbyState(payload: ServerPayloads[ServerEvents.LobbyState]) {
      setLobbyState(payload);
    }

    socket.on(ServerEvents.LobbyState, onLobbyState);

    socket.on("disconnect", () => setConnected(false));
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off(ServerEvents.LobbyState, onLobbyState);
    };
  }, [socket]);

  if (!connected) {
    return <div>Chargement...</div>;
  }

  if (lobbyState === null) {
    return <GameMenu socket={socket} />;
  }

  return <LobbyPage socket={socket} lobbyState={lobbyState} />;
}
