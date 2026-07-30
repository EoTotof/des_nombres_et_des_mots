export type Tile = {
  id: string;
  value: number;
  isInitial: boolean;
};

export type Operator = "+" | "-" | "*" | "/";

export type NumbersRound = {
  target: number;
  tiles: Tile[];
};
