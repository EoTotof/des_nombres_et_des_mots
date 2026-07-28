export type Tile = {
  id: number;
  value: number;
  isInitial: boolean;
};

export type Operator = "+" | "-" | "*" | "/";

export type NumbersRound = {
  target: number;
  tiles: Tile[];
};
