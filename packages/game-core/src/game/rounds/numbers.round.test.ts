import { describe, expect, it } from "vitest";
import { NumbersRound } from "./numbers.round";
import { PlayerId, RoundScore } from "../game.types";
import { NumbersGameState } from "../../numbers";

function getMockGameState(
  distanceToTarget: number,
  operationCount: number,
): NumbersGameState {
  return { distanceToTarget, operationCount } as NumbersGameState;
}

type TestInstanceT = {
  name: string;
  solution: [number, number];
  players: Record<PlayerId, [number, number]>;
  expected: RoundScore;
};

const testInstances: TestInstanceT[] = [
  {
    name: "ranks players independently of insertion order",
    solution: [0, 3],
    players: {
      charlie: [2, 2],
      eve: [0, 5],
      alice: [0, 3],
      david: [1, 2],
      bob: [0, 4],
    },
    expected: {
      alice: 10,
      bob: 9,
      eve: 8,
      david: 7,
      charlie: 6,
    },
  },
  {
    name: "optimal solution followed by target reached followed by target no reached",
    solution: [0, 3],
    players: {
      alice: [0, 3],
      bob: [0, 4],
      charlie: [2, 2],
    },
    expected: {
      alice: 10,
      bob: 9,
      charlie: 7,
    },
  },
  {
    name: "target reached but nobody found the optimal solution",
    solution: [0, 3],
    players: {
      alice: [0, 4],
      bob: [1, 2],
      charlie: [2, 2],
    },
    expected: {
      alice: 9,
      bob: 7,
      charlie: 6,
    },
  },
  {
    name: "two optimal solutions followed by target not reached",
    solution: [0, 3],
    players: {
      alice: [0, 3],
      bob: [0, 4],
      charlie: [1, 2],
    },
    expected: {
      alice: 10,
      bob: 9,
      charlie: 7,
    },
  },
  {
    name: "multiple players with the optimal solution",
    solution: [0, 3],
    players: {
      alice: [0, 3],
      bob: [0, 3],
      charlie: [0, 4],
      david: [2, 3],
    },
    expected: {
      alice: 10,
      bob: 10,
      charlie: 8,
      david: 7,
    },
  },
  {
    name: "multiple players tie for best target reached",
    solution: [0, 3],
    players: {
      alice: [0, 4],
      bob: [0, 4],
      charlie: [0, 5],
    },
    expected: {
      alice: 9,
      bob: 9,
      charlie: 7,
    },
  },
  {
    name: "nobody reaches the target",
    solution: [0, 3],
    players: {
      alice: [1, 3],
      bob: [2, 2],
      charlie: [3, 2],
    },
    expected: {
      alice: 7,
      bob: 6,
      charlie: 5,
    },
  },
  {
    name: "multiple players tie for best non-target attempt",
    solution: [0, 3],
    players: {
      alice: [1, 3],
      bob: [1, 3],
      charlie: [2, 2],
    },
    expected: {
      alice: 7,
      bob: 7,
      charlie: 5,
    },
  },
  {
    name: "operation count determines ranking when distance is equal",
    solution: [0, 3],
    players: {
      alice: [1, 2],
      bob: [1, 3],
      charlie: [1, 4],
    },
    expected: {
      alice: 7,
      bob: 6,
      charlie: 5,
    },
  },
  {
    name: "target reached players are capped at 9",
    solution: [0, 1],
    players: {
      alice: [0, 2],
      bob: [0, 3],
      charlie: [0, 4],
      david: [0, 5],
    },
    expected: {
      alice: 9,
      bob: 8,
      charlie: 7,
      david: 6,
    },
  },
  {
    name: "non-target players are capped at 7",
    solution: [0, 1],
    players: {
      alice: [1, 2],
      bob: [2, 2],
      charlie: [3, 2],
      david: [4, 2],
    },
    expected: {
      alice: 7,
      bob: 6,
      charlie: 5,
      david: 4,
    },
  },
  {
    name: "target reached after non-target attempts still gets category cap",
    solution: [0, 3],
    players: {
      alice: [0, 4],
      bob: [1, 2],
      charlie: [2, 2],
    },
    expected: {
      alice: 9,
      bob: 7,
      charlie: 6,
    },
  },
  {
    name: "ties consume ranking positions",
    solution: [0, 3],
    players: {
      alice: [0, 4],
      bob: [0, 4],
      charlie: [0, 4],
      david: [1, 2],
    },
    expected: {
      alice: 9,
      bob: 9,
      charlie: 9,
      david: 6,
    },
  },
  {
    name: "large tie followed by target player",
    solution: [0, 3],
    players: {
      alice: [0, 4],
      bob: [0, 4],
      charlie: [0, 4],
      david: [0, 5],
    },
    expected: {
      alice: 9,
      bob: 9,
      charlie: 9,
      david: 6,
    },
  },
  {
    name: "scores cannot become negative",
    solution: [0, 1],
    players: {
      alice: [1, 1],
      bob: [2, 1],
      charlie: [3, 1],
      david: [4, 1],
      eve: [5, 1],
      frank: [6, 1],
      grace: [7, 1],
      henry: [8, 1],
      iris: [9, 1],
      jack: [10, 1],
    },
    expected: {
      alice: 7,
      bob: 6,
      charlie: 5,
      david: 4,
      eve: 3,
      frank: 2,
      grace: 1,
      henry: 0,
      iris: 0,
      jack: 0,
    },
  },
];

describe("NumbersRound.getScores", () => {
  it.each(testInstances)("$name", ({ solution, players, expected }) => {
    const initialGameState = {
      getSolvedGameState: () => getMockGameState(...solution),
    } as NumbersGameState;

    const playerStates: Record<PlayerId, NumbersGameState> = Object.fromEntries(
      Object.entries(players).map(([key, value]) => [
        key,
        getMockGameState(...value),
      ]),
    );

    const round = new NumbersRound(initialGameState, playerStates);
    const scores = round.getScores();
    Object.entries(scores).forEach(([player, score]) =>
      expect(score).toBe(expected[player]),
    );
  });
});
