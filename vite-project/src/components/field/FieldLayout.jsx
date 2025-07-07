import styles from "./FieldLayout.module.css";
import { store } from "../../store";
import { useEffect, useState } from "react";

export const FieldLayout = () => {
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

  return (
    <div className={styles.gameBoard}>
      {state.field.map((el, index) => (
        <div
          key={index}
          className={styles.cell}
          data-index={index}
          onClick={() => handleCellClick(index)}
        >
          {el}
        </div>
      ))}
    </div>
  );
};
