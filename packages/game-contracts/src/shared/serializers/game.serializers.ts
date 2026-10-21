import {
  CurrentRoundPayload,
  NumbersRoundPayload,
  ObfuscatedNumbersRoundPayload,
  ObfuscatedWordsRoundPayload,
  PreviousRoundPayload,
  WordsRoundPayload,
} from "@dnedm/game-contracts";
import {
  Game,
  NumbersRound,
  Player,
  PlayerId,
  WordsRound,
} from "@dnedm/game-core";
import { serializeNumbersGame } from "./numbers.serializers.js";
import { serializeWordsGame } from "./words.serializers.js";

export function getPlayerFromPlayerId(
  playerId: PlayerId,
  players: Player[],
): Player {
  const player = players.find(({ id }) => id === playerId);
  if (!player) {
    throw Error("player should exist in players");
  }
  return player;
}

export function serializePreviousRound(
  players: Player[],
  previousRound: null,
): null;
export function serializePreviousRound(
  players: Player[],
  previousRound: NumbersRound,
): NumbersRoundPayload;
export function serializePreviousRound(
  players: Player[],
  previousRound: WordsRound,
): WordsRoundPayload;
export function serializePreviousRound(
  players: Player[],
  previousRound: Game["previousRound"],
): PreviousRoundPayload | null;

export function serializePreviousRound(
  players: Player[],
  previousRound: Game["previousRound"],
): PreviousRoundPayload | null {
  if (previousRound === null) {
    return null;
  }

  if (previousRound instanceof NumbersRound) {
    return {
      type: "numbers",
      playerStates: Object.fromEntries(
        Object.entries(previousRound.playerBestAttempts).map(
          ([playerId, gameState]) => [
            getPlayerFromPlayerId(playerId, players).name,
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
          ([playerId, gameState]) => [
            getPlayerFromPlayerId(playerId, players).name,
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
  players: Player[],
  currentRound: null,
): null;
export function serializeCurrentRound(
  playerId: PlayerId,
  players: Player[],
  currentRound: NumbersRound,
): ObfuscatedNumbersRoundPayload;
export function serializeCurrentRound(
  playerId: PlayerId,
  players: Player[],
  currentRound: WordsRound,
): ObfuscatedWordsRoundPayload;
export function serializeCurrentRound(
  playerId: PlayerId,
  players: Player[],
  currentRound: Game["currentRound"],
): CurrentRoundPayload | null;

export function serializeCurrentRound(
  playerId: PlayerId,
  players: Player[],
  currentRound: Game["currentRound"],
): CurrentRoundPayload | null {
  if (currentRound === null) {
    return null;
  }

  if (!currentRound.playerStates[playerId]) {
    throw Error("player ID not found in playerStates");
  }

  if (currentRound instanceof NumbersRound) {
    if (!currentRound.playerBestAttempts[playerId]) {
      throw Error("player ID not found in playerBestAttempts");
    }

    return {
      type: "numbers",
      playerStates: Object.fromEntries(
        Object.entries(currentRound.playerBestAttempts).map(
          ([playerId, gameState]) => [
            getPlayerFromPlayerId(playerId, players).name,
            serializeNumbersGame(gameState, true),
          ],
        ),
      ),
      currentPlayerState: serializeNumbersGame(
        currentRound.playerStates[playerId],
        false,
      ),
      currentBestAttempt: serializeNumbersGame(
        currentRound.playerBestAttempts[playerId],
        false,
      ),
    };
  }

  if (currentRound instanceof WordsRound) {
    return {
      type: "words",
      playerStates: Object.fromEntries(
        Object.entries(currentRound.playerStates).map(
          ([playerId, gameState]) => [
            getPlayerFromPlayerId(playerId, players).name,
            serializeWordsGame(gameState, true),
          ],
        ),
      ),
      currentPlayerState: serializeWordsGame(
        currentRound.playerStates[playerId],
        false,
      ),
    };
  }

  throw Error("unexpected type for previousRound");
}
