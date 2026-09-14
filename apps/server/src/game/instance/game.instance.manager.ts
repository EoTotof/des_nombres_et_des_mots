import { MovePayload, parseOperationPayload } from "@dnedm/game-contracts";
import {
  DEFAULT_GAME_PARAMETERS,
  GameParameters,
  Game,
  PlayerId,
  NumbersGameState,
} from "@dnedm/game-core";

const RESULTS_TIMER = 30;

export class GameInstanceManager {
  gameParameters: GameParameters;
  gameInstance: Game | null;
  onStateChange: () => void;

  private roundTimer: ReturnType<typeof setTimeout> | null = null;
  public roundEndsAt: number | null = null;
  private nextRoundTimer: ReturnType<typeof setTimeout> | null = null;
  public nextRoundStartsAt: number | null = null;

  constructor(
    gameParameters: GameParameters,
    gameInstance: Game | null,
    onStateChange: () => void,
  ) {
    this.gameParameters = gameParameters;
    this.gameInstance = gameInstance;
    this.onStateChange = onStateChange;
  }

  static initialize(onEvent: () => void): GameInstanceManager {
    const parameters: GameParameters = DEFAULT_GAME_PARAMETERS;
    return new GameInstanceManager(parameters, null, onEvent);
  }

  public setGameParameters(parameters: GameParameters) {
    this.gameParameters = parameters;
    this.onStateChange();
  }

  private startRound(): void {
    if (!this.gameInstance) {
      throw new Error("Game has not started");
    }

    this.clearNextRoundTimer();

    this.gameInstance.startNewRound();

    this.onStateChange();

    this.roundEndsAt =
      new Date().getTime() + this.gameParameters.roundDuration * 1000;
    this.roundTimer = setTimeout(() => {
      this.endRound();
    }, this.gameParameters.roundDuration * 1000);
  }

  private endRound(): void {
    if (!this.gameInstance) {
      return;
    }

    this.clearRoundTimer();

    this.gameInstance.endCurrentRound();

    this.onStateChange();

    if (
      this.gameInstance.pastRoundScores.length >= this.gameParameters.roundCount
    ) {
      return;
    }

    this.nextRoundStartsAt = new Date().getTime() + RESULTS_TIMER * 1000;
    this.nextRoundTimer = setTimeout(() => {
      this.startRound();
    }, RESULTS_TIMER * 1000);
  }

  private clearRoundTimer(): void {
    if (this.roundTimer !== null) {
      clearTimeout(this.roundTimer);
      this.roundTimer = null;
      this.roundEndsAt = null;
    }
  }

  private clearNextRoundTimer(): void {
    if (this.nextRoundTimer !== null) {
      clearTimeout(this.nextRoundTimer);
      this.nextRoundTimer = null;
      this.nextRoundStartsAt = null;
    }
  }

  startGame(players: PlayerId[]) {
    this.clearRoundTimer();
    this.clearNextRoundTimer();

    this.gameInstance = Game.initializeGame(this.gameParameters, players);
    this.startRound();
  }

  pushMove(player: PlayerId, movePayload: MovePayload) {
    if (!this.gameInstance?.currentRound) {
      throw new Error("No on-going round");
    }

    const gameState = this.gameInstance.currentRound.playerStates[player];
    if (!gameState) {
      throw new Error("Player not found");
    }

    switch (movePayload.type) {
      case "operation":
        if (!(gameState instanceof NumbersGameState)) {
          throw new Error("Invalid move for current round");
        }
        this.gameInstance.pushMove(
          player,
          parseOperationPayload(movePayload.move, gameState.currentTiles),
        );
        break;
      case "word":
        this.gameInstance.pushMove(player, movePayload.move);
    }

    this.onStateChange();
  }

  undoMove(player: PlayerId, moveId: string) {
    if (!this.gameInstance?.currentRound) {
      throw new Error("No ongoing round");
    }

    this.gameInstance.undoMove(player, moveId);

    this.onStateChange();
  }
}
