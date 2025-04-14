import { useState } from "react";
import styles from "./app.module.css";

function App() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [list, setList] = useState([]);
  const [isValueValid, setIsValueValid] = useState(false);

  const onAddButtonClick = () => {
    if (isValueValid) {
      const id = Date.now();
      const updatedList = [...list, { id, value }];
      setList(updatedList);
      setValue("");
      setError("");
      setIsValueValid(false);
    }
  };

  const onInputButtonClick = () => {
    const promptValue = prompt("Введите значение", "");
    if (promptValue.length < 3) {
      setError("Введенное значение должно содержать минимум 3 символа");
      setIsValueValid(false);
    } else {
      setIsValueValid(true);
      setError("");
      setValue(promptValue);
    }
    return promptValue;
  };

  const getDateString = (date) => {
    date = new Date(date);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      <h1 className={styles["page-heading"]}>Ввод значения</h1>
      <p className={styles["no-margin-text"]}>
        Текущее значение <code> value </code>: "
        <output className={styles["current-value"]}>{value}</output>"
      </p>
      {error && <div className={styles["error"]}>{error}</div>}
      <div className={styles["buttons-container"]}>
        <button className={styles["button"]} onClick={onInputButtonClick}>
          Ввести новое
        </button>
        <button
          className={styles["button"]}
          disabled={!isValueValid}
          onClick={onAddButtonClick}
        >
          Добавить в список
        </button>
      </div>
      <div className={styles["list-container"]}>
        <h2 className={styles["list-heading"]}>Список:</h2>
        {list.length <= 0 && (
          <p className={styles["no-margin-text"]}>Нет добавленных элементов</p>
        )}
        {list.length > 0 && (
          <ul className={styles["list"]}>
            {list.map(({ id, value }) => (
              <li key={id} className={styles["list-item"]}>
                {'[' + getDateString(id) + '] ' + value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
