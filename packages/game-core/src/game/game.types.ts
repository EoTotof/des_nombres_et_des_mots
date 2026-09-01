import { NumbersRoundParameters } from "../numbers/index.js";
import { WordsRoundParameters } from "../words/index.js";

type GameMode = "numbers" | "words" | "mixed";

export type GameParameters = {
  roundCount: number;
  roundDuration: number;
  gameMode: GameMode;
  numbersParameters: Omit<NumbersRoundParameters, "duration"> | null;
  wordsParameters: Omit<WordsRoundParameters, "duration"> | null;
};

export type PlayerId = string;

export type RoundScore = Record<PlayerId, number>;
