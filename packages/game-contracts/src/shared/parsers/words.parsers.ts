import { WordsGameState } from "@dnedm/game-core";
import { WordsGamePayload } from "../words.payloads.js";

export function parseWordsGamePayload(
  payload: WordsGamePayload,
): WordsGameState {
  const { initialTiles, words } = payload;

  return new WordsGameState(initialTiles, words);
}
