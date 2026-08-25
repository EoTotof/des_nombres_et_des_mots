import { LetterTile } from "@dnedm/game-core";
import { useState } from "react";

export type CurrentWordT = LetterTile[];

type UseCurrentWordReturnT = {
  currentWord: CurrentWordT;
  selectLetter: (letter: LetterTile) => void;
  removeLetter: (letter: LetterTile) => void;
  removeLastLetter: () => void;
  validateWord: () => void;
  resetCurrentWord: () => void;
};

export default function useCurrentWord(
  pushWord: (word: LetterTile[]) => void,
): UseCurrentWordReturnT {
  const [currentWord, setCurrentWord] = useState<CurrentWordT>([]);

  function selectLetter(letter: LetterTile) {
    setCurrentWord([...currentWord, letter]);
  }

  function removeLetter(letter: LetterTile) {
    const word = [...currentWord];
    const letterIndex = word.findIndex(
      (wordLetter) => letter.id === wordLetter.id,
    );
    word.splice(letterIndex, 1);
    setCurrentWord(word);
  }

  function removeLastLetter() {
    const word = [...currentWord];
    if (word.length > 0) {
      word.pop();
      setCurrentWord(word);
    }
  }

  function validateWord() {
    try {
      pushWord(currentWord);
    } catch (e) {
      console.log(e); // TODO toaster
    }
    resetCurrentWord();
  }

  function resetCurrentWord() {
    setCurrentWord([]);
  }

  return {
    currentWord,
    selectLetter,
    removeLetter,
    removeLastLetter,
    validateWord,
    resetCurrentWord,
  };
}
