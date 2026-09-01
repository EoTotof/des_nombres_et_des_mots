import {
  DEFAULT_GAME_PARAMETERS,
  GameParameters,
  GameState,
  PlayerId,
} from "@dnedm/game-core";

export class GameInstanceManager {
  gameParameters: GameParameters;
  gameInstance: GameState | null;

  constructor(gameParameters: GameParameters, gameInstance: GameState | null) {
    this.gameParameters = gameParameters;
    this.gameInstance = gameInstance;
  }

  static initialize(): GameInstanceManager {
    const parameters: GameParameters = DEFAULT_GAME_PARAMETERS;
    return new GameInstanceManager(parameters, null);
  }

  startGame(players: PlayerId[]) {
    this.gameInstance = GameState.initializeGame(this.gameParameters, players);
    this.gameInstance.startNewRound();
    setTimeout(() => this.gameInstance?.endCurrentRound());
  }
}
