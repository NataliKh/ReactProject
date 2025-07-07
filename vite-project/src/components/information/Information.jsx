import { InformationLayout } from "./ImformationLayout.jsx";
import { store } from "../../store";

export const Information = () => {
  const state = store.getState();

  let textInformation;
  if (state.isGameEnded) {
    textInformation = state.isDraw ? "Ничья" : `Победа: ${state.currentPlayer}`;
  } else {
    textInformation = `Ходит: ${state.currentPlayer}`;
  }

  return <InformationLayout>{textInformation}</InformationLayout>;
};
