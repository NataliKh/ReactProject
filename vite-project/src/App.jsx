import styles from "./app.module.css";
import { useState } from "react";

export default function App() {
  const NUMS = [7, 8, 9, "+", 4, 5, 6, "-", 1, 2, 3, "=", "C", 0];
  const [operand1, setOperand1] = useState("");
  const [operand2, setOperand2] = useState("");
  const [operator, setOperator] = useState("");
  const [isResult, setIsResult] = useState(false);

  function getResult() {
    let result;
    const num1 = Number(operand1);
    const num2 = Number(operand2);
    if (operator === "+") {
      result = num1 + num2;
    } else if (operator === "-") {
      result = num1 - num2;
    }
    return String(result);
  }

  function handleNumberInput(currentValue, newDigit) {
    // Если текущее значение "0" и вводится новая цифра, заменяем "0" на новую цифру
    if (currentValue === "0") {
      return newDigit;
    }
    // В остальных случаях просто добавляем цифру
    return currentValue + newDigit;
  }

  function onClickButton(value) {
    const strValue = String(value);

    if (isResult && !isNaN(strValue)) {
      setOperand1(strValue);
      setOperator("");
      setOperand2("");
      setIsResult(false);
      return;
    }

    if (!isNaN(strValue) || strValue === "0") {
      if (operator === "") {
        setOperand1(prev => handleNumberInput(prev, strValue));
      } else {
        setOperand2(prev => handleNumberInput(prev, strValue));
      }
    } else if (strValue === "+" || strValue === "-") {
      if (operand1 && !operand2) {
        setOperator(strValue);
      } else if (operand1 && operand2) {
        setOperand1(getResult());
        setOperator(strValue);
        setOperand2("");
      }
      setIsResult(false);
    } else if (strValue === "=" && operand1 && operand2 && operator) {
      setOperand1(getResult());
      setOperator("");
      setOperand2("");
      setIsResult(true);
    }
  }

  function onClickButtonClear() {
    setOperand1("");
    setOperand2("");
    setOperator("");
    setIsResult(false);
  }

  return (
    <div className={styles["calculator"]}>
      <input
        type="text"
        className={`${styles["calculator-display"]} ${
          isResult ? styles["done"] : ""
        }`}
        value={operand1 + operator + operand2}
        readOnly
      />
      <div className={styles["calculator-buttons"]}>
        {NUMS.map((num) => {
          const strNum = String(num);
          if (!isNaN(num) || num === 0)
            return (
              <button
                className={styles["calculator-button"] + " " + styles["number"]}
                onClick={() => onClickButton(num)}
                key={strNum}
              >
                {num}
              </button>
            );
          else if (num !== "C")
            return (
              <button
                className={
                  styles["calculator-button"] + " " + styles["operator"]
                }
                onClick={() => onClickButton(num)}
                key={strNum}
              >
                {num}
              </button>
            );
          else
            return (
              <button
                className={styles["calculator-button"] + " " + styles["clear"]}
                onClick={onClickButtonClear}
                key={strNum}
              >
                {num}
              </button>
            );
        })}
      </div>
    </div>
  );
}