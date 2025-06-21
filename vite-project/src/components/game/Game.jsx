import { useEffect, useState } from "react";
import { GameLayout } from "./GameLayout.jsx";
import { store } from "../../store";

export const Game = () => {
  const [, setVersion] = useState(0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setVersion((v) => v + 1);
    });
    return unsubscribe;
  }, []);

  const state = store.getState();

  const getTextInformation = () => {
    if (state.isGameEnded) {
      return state.isDraw ? "Ничья" : `Победа: ${state.currentPlayer}`;
    }
    return `Ходит: ${state.currentPlayer}`;
  };

  const handleResetClick = () => {
    store.dispatch({ type: "RESET" });
  };

  const handleCellClick = (index) => {
    store.dispatch({ type: "CLICK_CELL", payload: { index } });
  };

  return (
    <GameLayout
      field={state.field}
      handleCellClick={handleCellClick}
      textInformation={getTextInformation()}
      onClick={handleResetClick}
    />
  );
};
