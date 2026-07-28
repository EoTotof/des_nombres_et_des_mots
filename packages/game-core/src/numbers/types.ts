export type NumberTile =
  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 25 | 50 | 75 | 100;

export type Operator = "+" | "-" | "*" | "/";

export type NumbersRound = {
  target: number;
  tiles: NumberTile[];
};

export type NumbersExpression = {
  leftTile: NumberTile;
  operator: Operator;
  rightTile: NumberTile;
};
