import { createContext, useContext } from "react";

export type CardSize = {
  width: number;
  height: number;
};

export type NumbersGameContextT = {
  tileCardSize: CardSize;
  setTileCardSize: (size: CardSize) => void;
  operatorCardSize: CardSize;
  setOperatorCardSize: (size: CardSize) => void;
};

export const NumbersGameContext = createContext<NumbersGameContextT | null>(
  null,
);

export function useNumbersGameContext() {
  const context = useContext(NumbersGameContext);

  if (!context) {
    throw new Error("NumbersGameContext called outside of provider");
  }

  return context;
}
