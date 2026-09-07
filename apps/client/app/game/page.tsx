"use client";

import {
  ClientEvents,
  ServerEvents,
  ServerPayloads,
} from "@dnedm/game-contracts";
import { useLocalStorageValue } from "@react-hookz/web";
import { PlayerId } from "@dnedm/game-core";
import Button from "@/components/Button";
import { useSocket } from "./_hooks/useSocket";
import { useEffect, useState } from "react";
import LobbyMenu from "./_components/LobbyMenu";

export default function Game() {
  const { value: playerId, set: setPlayerId } =
    useLocalStorageValue<PlayerId | null>("player_id", {
      defaultValue: null,
      initializeWithValue: true,
    });

  const [lobbyState, setLobbyState] = useState<
    ServerPayloads[ServerEvents.LobbyState] | null
  >(null);

  const socket = useSocket(playerId, setPlayerId);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    function onLobbyState(payload: ServerPayloads[ServerEvents.LobbyState]) {
      setLobbyState(payload);
    }

    socket.on(ServerEvents.LobbyState, onLobbyState);

    return () => {
      socket.off(ServerEvents.LobbyState, onLobbyState);
    };
  }, [socket]);

  //if (!socket.connected) {
  //  return <div>Chargement...</div>;
  //}

  if (lobbyState === null) {
    return <LobbyMenu socket={socket} />;
  }

  return (
    <div>
      <div>lobby ID: {lobbyState.lobbyId}</div>
      <div>lobby owner: {lobbyState.owner}</div>
      <div>
        <ul>
          {lobbyState.players.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
