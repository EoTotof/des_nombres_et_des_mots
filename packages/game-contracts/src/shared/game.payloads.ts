import { RoundScore } from "@dnedm/game-core";
import {
  NumbersMovePayload,
  NumbersRoundPayload,
  ObfuscatedNumbersRoundPayload,
} from "./numbers.payloads.js";
import {
  ObfuscatedWordsRoundPayload,
  WordsMovePayload,
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

export type MovePayload = NumbersMovePayload | WordsMovePayload;
