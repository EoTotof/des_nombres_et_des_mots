import { PlayerId, RoundScore } from "./game.types.js";

interface CloneableGameState {
  clone(): this;
}

export abstract class GameRound<TGameState extends CloneableGameState, TMove> {
  protected readonly initialState: TGameState;
  readonly playerStates: Record<PlayerId, TGameState>;
  readonly playerBestAttempts: Record<PlayerId, TGameState>;

  constructor(
    initialState: TGameState,
    playerStates: Record<PlayerId, TGameState>,
    playerBestAttempts: Record<PlayerId, TGameState>,
  ) {
    this.initialState = initialState;
    this.playerStates = playerStates;
    this.playerBestAttempts = playerBestAttempts;
  }

  abstract pushMove(playerId: PlayerId, move: TMove): void;

  abstract getScores(): RoundScore;
}
