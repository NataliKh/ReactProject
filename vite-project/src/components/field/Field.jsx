import { FieldLayout } from "./FieldLayout.jsx";
import { store } from "../../store";

export const Field = () => {
  const state = store.getState();

  const handleCellClick = (index) => {
    store.dispatch({ type: "CLICK_CELL", payload: { index } });
  };

  return <FieldLayout field={state.field} handleCellClick={handleCellClick} />;
};
