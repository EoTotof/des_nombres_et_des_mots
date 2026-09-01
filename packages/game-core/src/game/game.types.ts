import { NumbersRoundParameters } from "../numbers";
import { WordsRoundParameters } from "../words";

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
