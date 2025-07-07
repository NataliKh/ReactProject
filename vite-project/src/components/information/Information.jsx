import { InformationLayout } from "./ImformationLayout.jsx";
import { store } from "../../store";
import { useEffect, useState } from "react";

export const Information = () => {
  const [, setVersion] = useState(0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setVersion((v) => v + 1);
    });
    return unsubscribe;
  }, []);

  const state = store.getState();

  let textInformation;
  if (state.isGameEnded) {
    textInformation = state.isDraw ? "Ничья" : `Победа: ${state.currentPlayer}`;
  } else {
    textInformation = `Ходит: ${state.currentPlayer}`;
  }

  return <InformationLayout>{textInformation}</InformationLayout>;
};
