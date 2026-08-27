"use client";

import { createContext, useContext } from "react";
import { socket } from "@/lib/socket";

export const SocketContext = createContext(socket);

export function useSocketContext() {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("NumbersGameStateContext called outside of provider");
  }

  return context;
}
