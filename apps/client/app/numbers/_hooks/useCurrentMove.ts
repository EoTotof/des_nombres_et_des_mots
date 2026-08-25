import {
  isOperator,
  Operation,
  Operator,
  NumberTile,
  Token,
} from "@dnedm/game-core";
import { useEffect, useState } from "react";

export type CurrentMoveT = {
  leftTile: NumberTile | null;
  operator: Operator | null;
  rightTile: NumberTile | null;
};

type UseCurrentMoveReturnT = {
  currentMove: CurrentMoveT;
  selectToken: (token: Token) => void;
  removeToken: (token: Token) => void;
  resetCurrentMove: () => void;
};

export default function useCurrentMove(
  pushOperation: (operation: Operation) => void,
): UseCurrentMoveReturnT {
  const [currentMove, setCurrentMove] =
    useState<CurrentMoveT>(INITIAL_CURRENT_MOVE);

  function selectToken(token: Token) {
    if (isOperator(token)) {
      if (currentMove.operator === null) {
        setCurrentMove({ ...currentMove, operator: token });
      }
    } else {
      if (currentMove.leftTile === null) {
        setCurrentMove({ ...currentMove, leftTile: token });
      } else if (currentMove.rightTile === null) {
        setCurrentMove({ ...currentMove, rightTile: token });
      }
    }
  }

  useEffect(() => {
    if (currentMove.leftTile && currentMove.operator && currentMove.rightTile) {
      pushOperation(
        new Operation(
          currentMove.leftTile,
          currentMove.rightTile,
          currentMove.operator,
        ),
      );
      resetCurrentMove();
    }
  }, [currentMove, pushOperation]);

  function removeToken(token: Token) {
    if (isOperator(token)) {
      setCurrentMove({ ...currentMove, operator: null });
    } else {
      if (currentMove.leftTile?.id === token.id) {
        setCurrentMove({ ...currentMove, leftTile: null });
      } else if (currentMove.rightTile?.id === token.id) {
        setCurrentMove({ ...currentMove, rightTile: null });
      }
    }
  }

  function resetCurrentMove() {
    setCurrentMove(INITIAL_CURRENT_MOVE);
  }

  return { currentMove, selectToken, removeToken, resetCurrentMove };
}

const INITIAL_CURRENT_MOVE = {
  leftTile: null,
  operator: null,
  rightTile: null,
};
