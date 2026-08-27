"use client";

import { useEffect } from "react";
import { SocketContext, useSocketContext } from "./_contexts/SocketContext";
import { ClientEvents } from "@dnedm/game-contracts";

export default function CreateGame() {
  const socket = useSocketContext();

  // Make a hook
  useEffect(() => {
    socket.connect();
  }, [socket]);

  return (
    <SocketContext value={socket}>
      <button onClick={() => socket.emit(ClientEvents.Ping)}>ping</button>
    </SocketContext>
  );
}
