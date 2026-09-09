import { GameRound } from "../game.round.js";
import { PlayerId, RoundScore } from "../game.types.js";
import { WordsGameState, WordsRoundParameters } from "../../words/index.js";

export class WordsRound extends GameRound<WordsGameState, string> {
  static initialize(
    players: PlayerId[],
    parameters: WordsRoundParameters,
  ): WordsRound {
    const initialGameState = WordsGameState.initializeGame(parameters);

    return new WordsRound(
      initialGameState,
      Object.fromEntries(
        players.map((playerId) => [playerId, initialGameState.clone()]),
      ),
      {},
    );
  }

  pushMove(playerId: PlayerId, word: string): void {
    const gameState = this.playerStates[playerId];

    if (!gameState) {
      throw new Error(`Unknown player: ${playerId}`);
    }

    this.playerStates[playerId] = gameState.pushWord(word);
  }

  getScores(): RoundScore {
    // Words round scoring
    //  - 1 point per letter in player's longest word
    //  - among players with longest word, bonus point for player with most words of this length (only if > 1)
    const scores: Record<PlayerId, number> = {};

    let longestWordLength = 0;
    let bestLongestWordsCount = 0;
    let bonusPointPlayers: PlayerId[] = [];

    for (const [player, gameState] of Object.entries(this.playerStates)) {
      const playerLongestWordLength = gameState.longestWordLength;
      const playerLongestWordsCount = gameState.longestWordsCount;

      scores[player] = playerLongestWordLength;

      if (playerLongestWordLength > longestWordLength) {
        longestWordLength = playerLongestWordLength;
        bestLongestWordsCount = playerLongestWordsCount;
        bonusPointPlayers = bestLongestWordsCount >= 2 ? [player] : [];
        continue;
      }

      if (playerLongestWordLength === longestWordLength) {
        if (playerLongestWordsCount > bestLongestWordsCount) {
          bestLongestWordsCount = playerLongestWordsCount;
          bonusPointPlayers = bestLongestWordsCount >= 2 ? [player] : [];
          continue;
        }

        if (
          playerLongestWordsCount === bestLongestWordsCount &&
          bestLongestWordsCount >= 2
        ) {
          bonusPointPlayers.push(player);
        }
      }
    }

    for (const player of bonusPointPlayers) {
      if (scores[player]) {
        // Bonus point only if at least one valid word submitted
        scores[player]++;
      }
    }

    return scores;
  }
}
