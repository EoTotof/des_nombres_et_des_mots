"use client";

import Button from "@/components/Button";
import {
  DEFAULT_WORDS_ROUND_PARAMETERS,
  WordsGameState,
  WordsRoundParameters,
} from "@dnedm/game-core";
import { useCallback, useState } from "react";
import { WordsGameStateContext } from "./_contexts/gameStateContext";
import { useCountdown } from "@/hooks/useCountdown";
import GameParameters from "./_components/GameParameters";
import { useLocalStorageValue } from "@react-hookz/web";
import GameInterface from "./_components/GameInterface";
import GameResultDialog from "./_components/interface/GameResultDialog";

export default function Words() {
  const { value: parameters, set: setParameters } =
    useLocalStorageValue<WordsRoundParameters>("words_parameters", {
      defaultValue: DEFAULT_WORDS_ROUND_PARAMETERS,
      initializeWithValue: false,
    });
  const [gameState, setGameState] = useState<WordsGameState | null>(null);
  const [solution, setSolution] = useState<WordsGameState | null>(null);

  function updateGameState(updatedState: WordsGameState) {
    setGameState(updatedState);
  }

  const onValidate = useCallback(() => {
    if (!gameState) {
      throw Error("Cannot validate if no attempt");
    }
    const computedSolution = gameState.getSolvedGameState();
    setSolution(computedSolution);
  }, [gameState]);

  const [timer, startTimer, resetTimer] = useCountdown(onValidate);

  function startNewGame() {
    if (!parameters) return;

    setSolution(null);
    setGameState(WordsGameState.initializeGame(parameters));
    if (parameters.duration) {
      startTimer(parameters.duration);
    }
  }

  if (!parameters) {
    return null;
  }

  if (!gameState) {
    return (
      <>
        <GameParameters parameters={parameters} setParameters={setParameters} />
        <Button onClick={startNewGame} className="mt-16">
          Lancer une partie
        </Button>
      </>
    );
  }

  return (
    <WordsGameStateContext value={{ currentGameState: gameState }}>
      <GameInterface
        key={gameState.initialTiles.map(({ letter }) => letter).join("")}
        gameState={gameState}
        timer={timer}
        updateGameState={updateGameState}
        onValidate={() => {
          resetTimer();
          onValidate();
        }}
      />
      {gameState && solution && (
        <GameResultDialog
          gameState={gameState}
          solution={solution}
          startNewGame={startNewGame}
        />
      )}
    </WordsGameStateContext>
  );
}
