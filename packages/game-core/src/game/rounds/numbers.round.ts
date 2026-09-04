import { GameRound } from "../game.round.js";
import { PlayerId, RoundScore } from "../game.types.js";
import { NumbersGameState } from "../../numbers/numbers.game-state.js";
import { Operation } from "../../numbers/numbers.operation.js";
import { NumbersRoundParameters } from "../../numbers/index.js";

const SOLUTION_SCORE = 10;
const TARGET_REACHED_SCORE = 9;
const TARGET_NOT_REACHED_SCORE = 7;

export class NumbersRound extends GameRound<NumbersGameState, Operation> {
  static initialize(
    players: PlayerId[],
    parameters: NumbersRoundParameters,
  ): NumbersRound {
    const initialGameState = NumbersGameState.initializeGame(parameters);

    return new NumbersRound(
      initialGameState,
      Object.fromEntries(
        players.map((playerId) => [playerId, initialGameState.clone()]),
      ),
    );
  }

  pushMove(playerId: PlayerId, operation: Operation): void {
    const gameState = this.playerStates[playerId];

    if (!gameState) {
      throw new Error(`Unknown player: ${playerId}`);
    }

    gameState.pushOperation(operation);
  }

  getSolvedGameState(): NumbersGameState {
    return this.initialState.getSolvedGameState();
  }

  getScores(): RoundScore {
    // Numbers round scoring
    //  - 10 points if best attempt equivalent to game solution (target reached or as close as possible, in minimal amount of operations)
    //  - if no one has found the best solution, 9 points if target reached by best player
    //  - if no one has found the solution and no one has reached target, 7 points for best attempt among players
    //  - decrement score for the following players, handling ties, capping score with previous rules
    const solution = this.getSolvedGameState();

    const rankedPlayers: [PlayerId, NumbersGameState][] = Object.entries(
      this.playerStates,
    ).toSorted(([, gameStateA], [, gameStateB]) => {
      if (gameStateA.distanceToTarget === gameStateB.distanceToTarget) {
        return gameStateA.operationCount - gameStateB.operationCount;
      }
      return gameStateA.distanceToTarget - gameStateB.distanceToTarget;
    });

    const scores: Record<PlayerId, number> = {};
    let currentScore: number = SOLUTION_SCORE;
    let tieCount = 0;

    let previousGameState: NumbersGameState | null = null;

    for (const [player, gameState] of rankedPlayers) {
      const hasSolution =
        solution.distanceToTarget === gameState.distanceToTarget &&
        solution.operationCount === gameState.operationCount;

      const isTie =
        previousGameState &&
        previousGameState.distanceToTarget === gameState.distanceToTarget &&
        previousGameState.operationCount === gameState.operationCount;

      if (previousGameState) {
        tieCount++;
      }

      if (!isTie) {
        // Attempt is not as good as previous players; reset tie count and decrement score by that amount
        currentScore -= tieCount;
        tieCount = 0;
      }

      previousGameState = gameState;

      if (hasSolution) {
        scores[player] = SOLUTION_SCORE;
        continue;
      }

      if (currentScore <= 0) {
        scores[player] = 0;
        continue;
      }

      const hasReachedTarget =
        solution.distanceToTarget === gameState.distanceToTarget;
      if (hasReachedTarget) {
        currentScore = Math.min(currentScore, TARGET_REACHED_SCORE);
        scores[player] = currentScore;
      } else {
        currentScore = Math.min(currentScore, TARGET_NOT_REACHED_SCORE);
        scores[player] = currentScore;
      }
    }

    return scores;
  }
}
