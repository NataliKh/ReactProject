import { GameLayout } from "./GameLayout.jsx";
import { useDispatch, useSelector } from "react-redux";

export const Game = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  const getTextInformation = () => {
    if (state.isGameEnded) {
      return state.isDraw ? "Ничья" : `Победа: ${state.currentPlayer}`;
    }
    return `Ходит: ${state.currentPlayer}`;
  };

  const handleResetClick = () => {
    dispatch({ type: "RESET" });
  };

  const handleCellClick = (index) => {
    dispatch({ type: "CLICK_CELL", payload: { index } });
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
