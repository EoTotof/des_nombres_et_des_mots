export type LetterTile = {
  id: string;
  letter: string;
};

export type WordsRound = {
  tiles: LetterTile[];
};

export type WordsRoundParameters = {
  vowelCount: number | null;
  duration: number | null;
};
