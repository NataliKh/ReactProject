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

  return <GameLayout />;
};
