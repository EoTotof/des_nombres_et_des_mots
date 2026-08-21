import { WordsGameState } from "@dnedm/game-core";
import { createContext, useContext } from "react";

// TODO factorize with NumbersGameStateContext??

export type WordsGameStateContextT = {
  currentGameState: WordsGameState;
};

export const WordsGameStateContext =
  createContext<WordsGameStateContextT | null>(null);

export function useWordsGameStateContext() {
  const context = useContext(WordsGameStateContext);

  if (!context) {
    throw new Error("WordsGameStateContext called outside of provider");
  }

  return context;
}
