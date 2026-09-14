import { LetterTile } from "@dnedm/game-core";

export type WordsRoundPayload = {
  type: "words";
  playerStates: Record<string, WordsGamePayload>;
};

export type ObfuscatedWordsRoundPayload = {
  type: "words";
  playerStates: Record<string, ObfuscatedWordsGamePayload>;
  currentPlayerState: WordsGamePayload;
};

export type WordsGamePayload = {
  initialTiles: LetterTile[];
  words: LetterTile[][];
};

export type ObfuscatedWordsGamePayload = {
  wordsLengths: number[];
};

export type WordsMovePayload = {
  type: "word";
  move: string | LetterTile[];
};
