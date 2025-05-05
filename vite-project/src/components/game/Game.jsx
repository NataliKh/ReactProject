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

  const handleCellClick = (index) => {
    if (field[index] || isGameEnded) return;
    const newField = [...field];
    newField[index] = currentPlayer;
    setField(newField);

    if (checkForWinner(newField, currentPlayer)) {
      setIsGameEnded(true);
      return;
    }
    if (newField.every((cell) => cell)) {
      setIsGameEnded(true);
      setIsDraw(true);
      return;
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkForWinner = (currentField, player) => {
    const WIN_PATTERNS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return WIN_PATTERNS.some((pattern) =>
      pattern.every((index) => currentField[index] === player)
    );
  };

  return (
    <GameLayout
      field={field}
      handleCellClick = {handleCellClick}
      textInformation={getTextInformation()}
      onClick={handleResetClick}
    />
  );
};
