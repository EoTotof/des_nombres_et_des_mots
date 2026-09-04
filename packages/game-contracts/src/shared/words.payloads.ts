import { LetterTile, PlayerId } from "@dnedm/game-core";

export type WordsRoundPayload = {
  type: "words";
  playerStates: Record<PlayerId, WordsGamePayload>;
};

export type ObfuscatedWordsRoundPayload = {
  type: "words";
  playerStates: Record<PlayerId, ObfuscatedWordsGamePayload>;
  currentPlayerState: WordsGamePayload;
};

export type WordsGamePayload = {
  initialTiles: LetterTile[];
  words: LetterTile[][];
};

export type ObfuscatedWordsGamePayload = {
  wordsLengths: number[];
};
