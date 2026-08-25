export type NumberTile = {
  id: string;
  value: number;
  isInitial: boolean;
};

export type Operator = "+" | "-" | "*" | "/";

export type Token = NumberTile | Operator;

export function isOperator(token: Token): token is Operator {
  return typeof token === "string";
}

export type NumbersRound = {
  target: number;
  tiles: NumberTile[];
};

export type NumbersRoundParameters = {
  bigNumberCount: number | null;
  allowUnreachableTarget: boolean;
  duration: number | null;
};
