import { generateInitialLetterTiles } from "./words.generator";
import { solve, wordIsValid } from "./words.solver";
import { WordsRoundParameters, LetterTile } from "./words.types";

export const DEFAULT_WORDS_ROUND_PARAMETERS: WordsRoundParameters = {
  vowelCount: 5,
  duration: 60,
};

const MIN_VOWEL_COUNT = 2;
const MAX_VOWEL_COUNT = 8;

function getRandomVowelCount(): number {
  return Math.floor(
    Math.random() * (MAX_VOWEL_COUNT - MIN_VOWEL_COUNT + 1) + MIN_VOWEL_COUNT,
  );
}

export class WordsGameState {
  initialTiles: LetterTile[];
  words: LetterTile[][];
  parameters: WordsRoundParameters;

  constructor(
    initialTiles: LetterTile[],
    words: LetterTile[][] | string[],
    parameters: WordsRoundParameters = DEFAULT_WORDS_ROUND_PARAMETERS,
  ) {
    this.initialTiles = initialTiles;
    this.parameters = parameters;
    this.words = words.map((word) => this.validateWord(word));
  }

  static initializeGame(parameters: WordsRoundParameters) {
    const { vowelCount } = parameters;

    return new WordsGameState(
      generateInitialLetterTiles(vowelCount ?? getRandomVowelCount()),
      [],
      parameters,
    );
  }

  get longestWordLength(): number {
    return this.words
      .map((word) => word.length)
      .reduce((acc, length) => Math.max(acc, length));
  }

  get longestWords(): LetterTile[][] {
    const bestWordLength = this.longestWordLength;
    return this.words.filter((word) => word.length === bestWordLength);
  }

  get longestWordsCount(): number {
    return this.longestWords.length;
  }

  validateWord(word: LetterTile[] | string): LetterTile[] {
    const wordAsString =
      typeof word === "string"
        ? word
        : word.map(({ letter }) => letter).join("");

    if (!wordIsValid(wordAsString)) {
      throw Error("word does not appear in dictionary");
    }

    const wordAsTiles: LetterTile[] = [];
    const tiles = [...this.initialTiles];

    for (const wordLetter of wordAsString) {
      const index = tiles.findIndex(({ letter }) => letter === wordLetter);
      if (index === -1) {
        throw Error("word cannot be written with game tiles");
      }

      const tile = tiles.splice(index, 1);
      wordAsTiles.push(...tile);
    }

    return wordAsTiles;
  }

  pushWord(word: LetterTile[] | string): WordsGameState {
    const validatedWord = this.validateWord(word);
    if (this.words.includes(validatedWord)) {
      return this;
    }

    return new WordsGameState(
      this.initialTiles,
      [...this.words, validatedWord],
      this.parameters,
    );
  }

  getSolvedGameState(): WordsGameState {
    return solve(this);
  }

  clone(): WordsGameState {
    return new WordsGameState(this.initialTiles, this.words, this.parameters);
  }
}
