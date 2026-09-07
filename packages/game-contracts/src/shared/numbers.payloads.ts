import { NumberTile, Operator } from "@dnedm/game-core";

export type NumbersRoundPayload = {
  type: "numbers";
  playerStates: Record<string, NumbersGamePayload>;
};

export type ObfuscatedNumbersRoundPayload = {
  type: "numbers";
  playerStates: Record<string, ObfuscatedNumbersGamePayload>;
  currentPlayerState: NumbersGamePayload;
};

export type NumbersGamePayload = {
  initialTiles: NumberTile[];
  targetNumber: number;
  operations: OperationPayload[];
};

export type ObfuscatedNumbersGamePayload = {
  closestValue: number;
};

export type OperationPayload = {
  leftId: string;
  rightId: string;
  operator: Operator;
};
