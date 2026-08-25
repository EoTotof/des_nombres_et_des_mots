export type Letter =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";

export type LetterTile = {
  id: string;
  letter: Letter;
};

export type WordsRound = {
  tiles: LetterTile[];
};

export type WordsRoundParameters = {
  vowelCount: number | null;
  duration: number | null;
};
