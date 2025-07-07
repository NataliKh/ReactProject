import { Field } from "../field/Field.jsx";
import { Information } from "../information/Information.jsx";
import { store } from "../../store";
import { useEffect, useState } from "react";

export const GameLayout = () => {
  const [, setVersion] = useState(0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setVersion((v) => v + 1);
    });
    return unsubscribe;
  }, []);

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
