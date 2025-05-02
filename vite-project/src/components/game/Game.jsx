import { useState } from "react";
import { GameLayout } from "./GameLayout.jsx";

export const Game = () => {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [field, setField] = useState(["", "", "", "", "", "", "", "", ""]);

  const getTextInformation = () => {
    if (isGameEnded) {
      if (isDraw) {
        return "Ничья";
      } else {
        return `Победа: ${currentPlayer}`;
      }
    }
    return `Ходит: ${currentPlayer}`;
  };

  const handleResetClick = () => {
    setField(["", "", "", "", "", "", "", "", ""]);
    setCurrentPlayer("X");
    setIsGameEnded(false);
    setIsDraw(false);
  };

  return (
    <GameLayout
      field={field}
      setField={setField}
      textInformation={getTextInformation()}
      currentPlayer={currentPlayer}
      setCurrentPlayer={setCurrentPlayer}
      isGameEnded = {isGameEnded}
      setIsGameEnded = {setIsGameEnded}
      setIsDraw = {setIsDraw}
      onClick={handleResetClick}
    />
  );
};
