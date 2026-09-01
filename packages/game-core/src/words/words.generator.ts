import lettersFrequency from "../data/fr/letters-frequency.json" with { type: "json" };
import { pickNRandomValuesFromArray } from "../utils.js";
import { Letter, LetterTile } from "./words.types.js";

export const LETTER_COUNT = 10;

const VOWELS: Letter[] = ["a", "e", "i", "o", "u", "y"];
const consumns = (Object.keys(lettersFrequency) as Letter[]).filter(
  (letter) => !VOWELS.includes(letter),
);

function getLetterPool(letters: Letter[]): Letter[] {
  const letterPool: Letter[] = [];

  for (const letter of letters) {
    const letterArray: Letter[] = new Array<Letter>(
      Math.floor(lettersFrequency[letter] + 1),
    ).fill(letter);

    letterPool.push(...letterArray);
  }

  return letterPool;
}

const vowelsPool = getLetterPool(VOWELS);
const consumnsPool = getLetterPool(consumns);

export function generateInitialLetterTiles(vowelCount: number): LetterTile[] {
  if (vowelCount > LETTER_COUNT) {
    throw Error("Vowel count is too large");
  }

  const vowels: Letter[] = pickNRandomValuesFromArray(vowelCount, vowelsPool);
  const consumns: Letter[] = pickNRandomValuesFromArray(
    LETTER_COUNT - vowelCount,
    consumnsPool,
  );

  const letters = vowels.concat(consumns).sort(() => Math.random() - 0.5);

  return letters.map((letter, index) => ({ id: `${index}`, letter }));
}
