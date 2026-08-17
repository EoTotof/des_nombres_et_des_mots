import { LetterTile } from "./types";
import rawAnagrams from "../../data/anagrams.json";

const anagrams = rawAnagrams as Record<string, string[]>;

export function solve(
  tiles: LetterTile[],
): string[] /* TODO GameState for consistency? */ {
  const solutions = new Set<string>();

  let currentDepth = new Set<string>(
    tiles
      .map(({ letter }) => letter)
      .sort()
      .join(""),
  );

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
      return [...solutions].sort();
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

  return [...solutions].sort();
}
