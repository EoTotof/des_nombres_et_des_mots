import {
  WordsGamePayload,
  ObfuscatedWordsGamePayload,
} from "@dnedm/game-contracts";
import { WordsGameState } from "@dnedm/game-core";

export function serializeWordsGame(
  game: WordsGameState,
  obfuscated: true,
): ObfuscatedWordsGamePayload;

export function serializeWordsGame(
  game: WordsGameState,
  obfuscated: false,
): WordsGamePayload;

export function serializeWordsGame(
  game: WordsGameState,
  obfuscated: boolean,
): ObfuscatedWordsGamePayload | WordsGamePayload {
  switch (obfuscated) {
    case true:
      return { wordsLengths: game.words.map((word) => word.length).toSorted() };
    case false:
      return {
        initialTiles: game.initialTiles,
        words: game.words,
      };
  }
}
