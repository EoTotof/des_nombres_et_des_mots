"use client";

import GameInterface from "@/app/numbers/_components/GameInterface";
import Button from "@/components/Button";
import {
  DEFAULT_NUMBERS_ROUND_PARAMETERS,
  NumbersGameState,
  NumbersRoundParameters,
} from "@dnedm/game-core";
import { useCallback, useState } from "react";
import { NumbersGameStateContext } from "./_contexts/gameStateContext";
import { useCountdown } from "@/hooks/useCountdown";
import GameParameters from "./_components/GameParameters";
import { useLocalStorageValue } from "@react-hookz/web";
import GameResultDialog from "./_components/interface/GameResultDialog";

export default function Numbers() {
  const { value: parameters, set: setParameters } =
    useLocalStorageValue<NumbersRoundParameters>("numbers_parameters", {
      defaultValue: DEFAULT_NUMBERS_ROUND_PARAMETERS,
      initializeWithValue: false,
    });
  const [gameState, setGameState] = useState<NumbersGameState | null>(null);
  const [bestAttempt, setBestAttempt] = useState<NumbersGameState | null>(null);
  const [solution, setSolution] = useState<NumbersGameState | null>(null);

  function updateGameState(updatedState: NumbersGameState) {
    setGameState(updatedState);
    // TODO add "equals" method to NumbersGameState to update state only if needed
    setBestAttempt(
      bestAttempt
        ? NumbersGameState.getBestAttempt(updatedState, bestAttempt)
        : updatedState,
    );
  }

  const onValidate = useCallback(() => {
    if (!gameState) {
      throw Error("Cannot validate if no attempt");
    }
    const computedSolution = gameState.getSolvedGameState();
    if (bestAttempt) {
      setSolution(
        NumbersGameState.getBestAttempt(bestAttempt, computedSolution),
      );
    } else {
      setBestAttempt(gameState);
      setSolution(computedSolution);
    }
  }, [bestAttempt, gameState]);

  const [timer, startTimer, resetTimer] = useCountdown(onValidate);

  function startNewGame() {
    if (!parameters) return;

    setSolution(null);
    setBestAttempt(null);
    setGameState(NumbersGameState.initializeGame(parameters));
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
    <NumbersGameStateContext value={{ currentGameState: gameState }}>
      <GameInterface
        key={gameState.initialTiles.map(({ value }) => value).join("")}
        gameState={gameState}
        timer={timer}
        bestAttempt={bestAttempt}
        pushMove={(operation) =>
          updateGameState(gameState.pushOperation(operation))
        }
        undoMove={(operation) =>
          updateGameState(gameState.removeOperation(operation))
        }
        onValidate={() => {
          resetTimer();
          onValidate();
        }}
      />
      {bestAttempt && solution && (
        <GameResultDialog
          bestAttempt={bestAttempt}
          solution={solution}
          startNewGame={startNewGame}
        />
      )}
    </NumbersGameStateContext>
  );
}
