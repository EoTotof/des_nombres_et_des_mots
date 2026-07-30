"use client";

import GameInterface from "@/components/numbers/GameInterface";
import { GameState } from "@dnedm/game-core";
import { useState } from "react";

export default function Numbers() {
  const [gameState, setGameState] = useState<GameState | null>(null);

  if (!gameState) {
    return (
      <button onClick={() => setGameState(new GameState(2))}>
        Lancer une partie
      </button>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <GameInterface gameState={gameState} />
    </div>
  );
}
