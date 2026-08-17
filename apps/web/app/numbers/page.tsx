"use client";

import GameInterface from "@/app/numbers/_components/GameInterface";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import {
  DEFAULT_NUMBERS_ROUND_PARAMETERS,
  GameState,
  NumbersRoundParameters,
} from "@dnedm/game-core";
import { useCallback, useState } from "react";
import MoveHistory from "./_components/interface/MoveHistory";
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
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [bestAttempt, setBestAttempt] = useState<GameState | null>(null);
  const [solution, setSolution] = useState<GameState | null>(null);

  function updateGameState(updatedState: GameState) {
    setGameState(updatedState);
    // TODO add "equals" method to GameState to update state only if needed
    setBestAttempt(
      bestAttempt
        ? GameState.getBestAttempt(updatedState, bestAttempt)
        : updatedState,
    );
  }

  const onValidate = useCallback(() => {
    if (!gameState) {
      throw Error("Cannot validate if no attempt");
    }
    const computedSolution = gameState.getSolution();
    if (bestAttempt) {
      setSolution(GameState.getBestAttempt(bestAttempt, computedSolution));
    } else {
      setBestAttempt(gameState);
      setSolution(computedSolution);
    }
  }, [bestAttempt, gameState]);

  const [timer, startTimer] = useCountdown(onValidate);

  function startNewGame() {
    if (!parameters) return;

    setSolution(null);
    setBestAttempt(null);
    setGameState(GameState.initializeGame(parameters));
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
        gameState={gameState}
        timer={timer}
        bestAttempt={bestAttempt}
        updateGameState={updateGameState}
        onValidate={onValidate}
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
