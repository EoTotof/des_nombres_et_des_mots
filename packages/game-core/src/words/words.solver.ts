import rawAnagrams from "../data/fr/anagrams.json";
import { WordsGameState } from "./words.game-state";

const anagrams = rawAnagrams as Record<string, string[]>;

export function wordIsValid(word: string): boolean {
  const key = [...word].sort().join("");
  return Boolean(anagrams[key] && anagrams[key].includes(word));
}

export function solve(gameState: WordsGameState): WordsGameState {
  const tiles = gameState.initialTiles;
  const solutions = new Set<string>();

  let currentDepth = new Set<string>([
    tiles
      .map(({ letter }) => letter)
      .sort()
      .join(""),
  ]);

  while (currentDepth.size > 0) {
    const nextDepth = new Set<string>();

    for (const sortedLetters of currentDepth) {
      if (anagrams[sortedLetters]) {
        for (const word of anagrams[sortedLetters]) {
          solutions.add(word);
        }
      }
    }

    if (solutions.size > 0) {
      return new WordsGameState(
        tiles,
        [...solutions].sort(),
        gameState.parameters,
      );
    }

    for (const sortedLetters of currentDepth) {
      for (let i = 0; i < sortedLetters.length; i++) {
        const clonedTiles = [...sortedLetters];
        clonedTiles.splice(i, 1);
        nextDepth.add(clonedTiles.join(""));
      }
    }
    currentDepth = nextDepth;
  }

  // No solution found, highly unlikely
  return new WordsGameState(tiles, [], gameState.parameters);
}
