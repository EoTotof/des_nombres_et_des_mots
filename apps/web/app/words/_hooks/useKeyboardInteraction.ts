import { useKeyboardEvent } from "@react-hookz/web";
import { CurrentWordT } from "./useCurrentWord";
import { LetterTile } from "@dnedm/game-core";
import { useWordsGameStateContext } from "../_contexts/gameStateContext";

const LETTER_REGEX = /^[A-Za-z]$/;

export default function useKeyboardInteraction(
  currentWord: CurrentWordT,
  selectLetter: (letter: LetterTile) => void,
  removeLastLetter: () => void,
  validateWord: () => void,
) {
  const { currentGameState } = useWordsGameStateContext();

  const usedTileIds = currentWord.map(({ id }) => id);
  const selectableTiles = currentGameState.initialTiles.filter(
    ({ id }) => !usedTileIds.includes(id),
  );

  useKeyboardEvent("Enter", validateWord);
  useKeyboardEvent("Backspace", removeLastLetter);
  useKeyboardEvent(
    (event) => Boolean(event.key.match(LETTER_REGEX)),
    (event) => {
      const tile = selectableTiles.find(
        ({ letter }) => event.key.toLowerCase() === letter.toLowerCase(),
      );
      if (tile) {
        selectLetter(tile);
      }
    },
  );
}
