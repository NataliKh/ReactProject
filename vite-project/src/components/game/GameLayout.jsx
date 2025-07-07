import { Field } from "../field/Field.jsx";
import { Information } from "../information/Information.jsx";
import { store } from "../../store";

export const GameLayout = () => {
  const handleResetClick = () => {
    store.dispatch({ type: "RESET" });
  };

  return (
    <>
      <Information />
      <Field />
      <button onClick={handleResetClick}>Начать заново</button>
    </>
  );
};
