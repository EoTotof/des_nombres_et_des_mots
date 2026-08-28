import { NumbersGameState } from "../numbers";
import { WordsGameState } from "../words";
import { CurrentRound, GameParameters, RoundScore } from "./game.types";

export class GameState {
  parameters: GameParameters;
  pastRoundScores: RoundScore[];
  currentRound:
    CurrentRound<NumbersGameState> | CurrentRound<WordsGameState> | null;

  constructor(parameters: GameParameters) {
    this.parameters = parameters;
    this.pastRoundScores = [];
    this.currentRound = null;
  }
}
