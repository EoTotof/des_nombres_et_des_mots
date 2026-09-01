import { describe, expect, it } from "vitest";
import { PlayerId, RoundScore } from "../game.types.js";
import { WordsGameState } from "../../words/index.js";
import { WordsRound } from "./words.round.js";

function getMockGameState(
  longestWordLength: number,
  longestWordsCount: number,
): WordsGameState {
  return { longestWordLength, longestWordsCount } as WordsGameState;
}

type TestInstanceT = {
  name: string;
  players: Record<PlayerId, [number, number]>;
  expected: RoundScore;
};

const testInstances: TestInstanceT[] = [
  {
    name: "player with longest word wins",
    players: {
      alice: [8, 1],
      bob: [7, 2],
      charlie: [6, 3],
    },
    expected: {
      alice: 8,
      bob: 7,
      charlie: 6,
    },
  },
  {
    name: "multiple players with same longest word, bonus requires at least two longest words",
    players: {
      alice: [8, 1],
      bob: [8, 1],
      charlie: [7, 2],
    },
    expected: {
      alice: 8,
      bob: 8,
      charlie: 7,
    },
  },
  {
    name: "player with most words of longest length gets bonus",
    players: {
      alice: [8, 1],
      bob: [8, 2],
      charlie: [7, 3],
    },
    expected: {
      alice: 8,
      bob: 9,
      charlie: 7,
    },
  },
  {
    name: "multiple players tie for most longest words",
    players: {
      alice: [8, 3],
      bob: [8, 3],
      charlie: [8, 2],
      david: [7, 5],
    },
    expected: {
      alice: 9,
      bob: 9,
      charlie: 8,
      david: 7,
    },
  },
  {
    name: "more words at shorter length do not give bonus",
    players: {
      alice: [8, 1],
      bob: [7, 10],
      charlie: [6, 20],
    },
    expected: {
      alice: 8,
      bob: 7,
      charlie: 6,
    },
  },
  {
    name: "three players tied for longest word, one gets bonus",
    players: {
      alice: [9, 2],
      bob: [9, 5],
      charlie: [9, 3],
      david: [8, 10],
    },
    expected: {
      alice: 9,
      bob: 10,
      charlie: 9,
      david: 8,
    },
  },

  {
    name: "shuffled players are ranked correctly",
    players: {
      charlie: [7, 4],
      eve: [9, 2],
      alice: [8, 1],
      david: [9, 5],
      bob: [8, 3],
    },
    expected: {
      charlie: 7,
      eve: 9,
      alice: 8,
      david: 10,
      bob: 8,
    },
  },
  {
    name: "shuffled players are ranked correctly, no bonus",
    players: {
      charlie: [6, 2],
      eve: [8, 1],
      alice: [10, 1],
      david: [7, 10],
      bob: [9, 1],
    },
    expected: {
      charlie: 6,
      eve: 8,
      alice: 10,
      david: 7,
      bob: 9,
    },
  },
];

describe("WordsRound.getScores", () => {
  it.each(testInstances)("$name", ({ players, expected }) => {
    const initialGameState = {} as WordsGameState;

    const playerStates: Record<PlayerId, WordsGameState> = Object.fromEntries(
      Object.entries(players).map(([key, value]) => [
        key,
        getMockGameState(...value),
      ]),
    );

    const round = new WordsRound(initialGameState, playerStates);
    const scores = round.getScores();
    Object.entries(scores).forEach(([player, score]) =>
      expect(score).toBe(expected[player]),
    );
  });
});
