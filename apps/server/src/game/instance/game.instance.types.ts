export type GameInstanceEventT = "roundStarted" | "roundEnded" | "gameEnded";
export type GameInstanceCallbacksT = Record<GameInstanceEventT, () => void>;
