// reducer.js
const initialState = {
  currentPlayer: "X",
  isGameEnded: false,
  isDraw: false,
  field: ["", "", "", "", "", "", "", "", ""],
};

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

function checkForWinner(field, player) {
  return WIN_PATTERNS.some((pattern) =>
    pattern.every((index) => field[index] === player)
  );
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "RESET":
      return initialState;

    case "CLICK_CELL": {
      const { index } = action.payload;
      if (state.isGameEnded || state.field[index]) return state;

      const newField = [...state.field];
      newField[index] = state.currentPlayer;

      const hasWinner = checkForWinner(newField, state.currentPlayer);
      const isDraw = !hasWinner && newField.every((cell) => cell !== "");

      return {
        ...state,
        field: newField,
        isGameEnded: hasWinner || isDraw,
        isDraw: isDraw,
        currentPlayer:
          hasWinner || isDraw
            ? state.currentPlayer
            : state.currentPlayer === "X"
            ? "O"
            : "X",
      };
    }

    default:
      return state;
  }
}
