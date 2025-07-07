import { Field } from "../field/Field.jsx";
import { Information } from "../information/Information.jsx";

export const GameLayout = ({ onReset }) => {
  return (
    <>
      <Information />
      <Field />
      <button onClick={onReset}>Начать заново</button>
    </>
  );
};
