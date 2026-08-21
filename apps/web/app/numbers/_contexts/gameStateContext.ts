import { NumbersGameState } from "@dnedm/game-core";
import { createContext, useContext } from "react";

export type NumbersGameStateContextT = {
  currentGameState: NumbersGameState;
};

export const NumbersGameStateContext =
  createContext<NumbersGameStateContextT | null>(null);

export function useNumbersGameStateContext() {
  const context = useContext(NumbersGameStateContext);

  if (!context) {
    throw new Error("NumbersGameStateContext called outside of provider");
  }

  return context;
}
