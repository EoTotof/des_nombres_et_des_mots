import {
  CurrentRoundPayload,
  NumbersRoundPayload,
  ObfuscatedNumbersRoundPayload,
  ObfuscatedWordsRoundPayload,
  PreviousRoundPayload,
  WordsRoundPayload,
} from "@dnedm/game-contracts";
import { Game, NumbersRound, PlayerId, WordsRound } from "@dnedm/game-core";
import { serializeNumbersGame } from "./numbers.serializers.js";
import { serializeWordsGame } from "./words.serializers.js";

export function serializePreviousRound(previousRound: null): null;
export function serializePreviousRound(
  previousRound: NumbersRound,
): NumbersRoundPayload;
export function serializePreviousRound(
  previousRound: WordsRound,
): WordsRoundPayload;
export function serializePreviousRound(
  previousRound: Game["previousRound"],
): PreviousRoundPayload | null;

export function serializePreviousRound(
  previousRound: Game["previousRound"],
): PreviousRoundPayload | null {
  if (previousRound === null) {
    return null;
  }

  if (previousRound instanceof NumbersRound) {
    return {
      type: "numbers",
      playerStates: Object.fromEntries(
        Object.entries(previousRound.playerStates).map(
          ([player, gameState]) => [
            player,
            serializeNumbersGame(gameState, false),
          ],
        ),
      ),
    };
  }

  if (previousRound instanceof WordsRound) {
    return {
      type: "words",
      playerStates: Object.fromEntries(
        Object.entries(previousRound.playerStates).map(
          ([player, gameState]) => [
            player,
            serializeWordsGame(gameState, false),
          ],
        ),
      ),
    };
  }

  throw Error("unexpected type for previousRound");
}

export function serializeCurrentRound(
  playerId: PlayerId,
  currentRound: null,
): null;
export function serializeCurrentRound(
  playerId: PlayerId,
  currentRound: NumbersRound,
): ObfuscatedNumbersRoundPayload;
export function serializeCurrentRound(
  playerId: PlayerId,
  currentRound: WordsRound,
): ObfuscatedWordsRoundPayload;
export function serializeCurrentRound(
  playerId: PlayerId,
  currentRound: Game["currentRound"],
): CurrentRoundPayload | null;

export function serializeCurrentRound(
  playerId: PlayerId,
  currentRound: Game["currentRound"],
): CurrentRoundPayload | null {
  if (currentRound === null) {
    return null;
  }

  if (!currentRound.playerStates[playerId]) {
    throw Error("player ID not found in playerStates");
  }

  if (currentRound instanceof NumbersRound) {
    return {
      type: "numbers",
      playerStates: Object.fromEntries(
        Object.entries(currentRound.playerStates).map(([player, gameState]) => [
          player,
          serializeNumbersGame(gameState, true),
        ]),
      ),
      currentPlayerState: serializeNumbersGame(
        currentRound.playerStates[playerId],
        false,
      ),
    };
  }

  if (currentRound instanceof WordsRound) {
    return {
      type: "words",
      playerStates: Object.fromEntries(
        Object.entries(currentRound.playerStates).map(([player, gameState]) => [
          player,
          serializeWordsGame(gameState, true),
        ]),
      ),
      currentPlayerState: serializeWordsGame(
        currentRound.playerStates[playerId],
        false,
      ),
    };
  }

  throw Error("unexpected type for previousRound");
}
