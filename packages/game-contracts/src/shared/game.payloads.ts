import { RoundScore } from "@dnedm/game-core";
import {
  NumbersRoundPayload,
  ObfuscatedNumbersRoundPayload,
} from "./numbers.payloads.js";
import {
  ObfuscatedWordsRoundPayload,
  WordsRoundPayload,
} from "./words.payloads.js";

export type PreviousRoundPayload = NumbersRoundPayload | WordsRoundPayload;

export type CurrentRoundPayload =
  ObfuscatedNumbersRoundPayload | ObfuscatedWordsRoundPayload;

export type GamePayload = {
  pastRoundScores: RoundScore[];
  previousRound: PreviousRoundPayload | null;
  currentRound: CurrentRoundPayload | null;
};
