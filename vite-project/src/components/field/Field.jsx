import { FieldLayout } from "./FieldLayout.jsx";
import { store } from "../../store";
import { useEffect, useState } from "react";

export const Field = () => {
  const [, setVersion] = useState(0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setVersion((v) => v + 1);
    });
    return unsubscribe;
  }, []);

  const state = store.getState();

  const handleCellClick = (index) => {
    store.dispatch({ type: "CLICK_CELL", payload: { index } });
  };

  return <FieldLayout field={state.field} handleCellClick={handleCellClick} />;
};
