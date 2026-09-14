import { NumbersRoundParameters, Operation } from "../numbers/index.js";
import { WordsRoundParameters } from "../words/index.js";

type GameMode = "numbers" | "words" | "mixed";

export type GameParameters = {
  roundCount: number;
  roundDuration: number;
  gameMode: GameMode;
  numbersParameters: Omit<NumbersRoundParameters, "duration">;
  wordsParameters: Omit<WordsRoundParameters, "duration">;
};

export type Move = Operation | string;

export type PlayerId = string;

export type Player = {
  id: PlayerId;
  name: string;
};

export type RoundScore = Record<PlayerId, number>;
