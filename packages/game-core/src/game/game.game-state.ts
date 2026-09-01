import { DEFAULT_NUMBERS_ROUND_PARAMETERS } from "../numbers/index.js";
import { DEFAULT_WORDS_ROUND_PARAMETERS } from "../words/index.js";
import { GameParameters, PlayerId, RoundScore } from "./game.types.js";
import { NumbersRound, WordsRound } from "./rounds/index.js";

const { duration: _nd, ...defaultNumbersParameters } =
  DEFAULT_NUMBERS_ROUND_PARAMETERS;
const { duration: _wd, ...defaultWordsParameters } =
  DEFAULT_WORDS_ROUND_PARAMETERS;

export const DEFAULT_GAME_PARAMETERS: GameParameters = {
  roundCount: 10,
  roundDuration: 60,
  gameMode: "mixed",
  numbersParameters: defaultNumbersParameters,
  wordsParameters: defaultWordsParameters,
};

export class GameState {
  parameters: GameParameters;
  players: PlayerId[];
  pastRoundScores: RoundScore[];
  currentRound: NumbersRound | WordsRound | null;

  constructor(
    parameters: GameParameters,
    players: PlayerId[],
    pastRoundScores: RoundScore[],
    currentRound: NumbersRound | WordsRound | null,
  ) {
    this.parameters = parameters;
    this.players = players;
    this.pastRoundScores = pastRoundScores;
    this.currentRound = currentRound;
  }

  static initializeGame(parameters: GameParameters, players: PlayerId[]) {
    return new GameState(parameters, players, [], null);
  }

  getCurrentGameScores() {
    const scores: Record<PlayerId, number> = Object.fromEntries(
      this.players.map((player) => [player, 0]),
    );

    this.pastRoundScores.forEach((roundScore) => {
      this.players.forEach((player) => {
        scores[player]! += roundScore[player]!;
      });
    });

    return scores;
  }

  endCurrentRound() {
    if (!this.currentRound) {
      throw Error("no current round");
    }

    this.pastRoundScores.push(this.currentRound.getScores());
    this.currentRound = null;
  }

  private startNewNumbersRound() {
    if (!this.parameters.numbersParameters) {
      throw Error("Cannot start Numbers round without Numbers parameters");
    }
    this.currentRound = NumbersRound.initialize(this.players, {
      ...this.parameters.numbersParameters,
      duration: this.parameters.roundDuration,
    });
  }

  private startNewWordsRound() {
    if (!this.parameters.wordsParameters) {
      throw Error("Cannot start Words round without Words parameters");
    }
    this.currentRound = WordsRound.initialize(this.players, {
      ...this.parameters.wordsParameters,
      duration: this.parameters.roundDuration,
    });
  }

  startNewRound() {
    const roundNumber = this.pastRoundScores.length;
    if (roundNumber >= this.parameters.roundCount) {
      throw Error("Game is over, cannot start a new round");
    }

    switch (this.parameters.gameMode) {
      case "numbers":
        this.startNewNumbersRound();
        break;
      case "words":
        this.startNewWordsRound();
        break;
      case "mixed":
        // Games start with a Words round, then alternate between Words and Numbers
        if (roundNumber % 2) {
          this.startNewWordsRound();
        } else {
          this.startNewNumbersRound();
        }
    }
  }
}
