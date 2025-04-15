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

  function onClickButton(e) {
    const value = e.target.textContent;

    if (isResult && !isNaN(value)) {
      setOperand1(value);
      setOperator("");
      setOperand2("");
      setIsResult(false);
      return;
    }

    if (!isNaN(value)) {
      if (operator === "") {
        setOperand1((prev) => prev + value);
      } else {
        setOperand2((prev) => prev + value);
      }
    } else if (value === "+" || value === "-") {
      if (operand1 && !operand2) {
        setOperator(value);
      } else if (operand1 && operand2) {
        setOperand1(getResult());
        setOperator(value);
        setOperand2("");
      }
      setIsResult(false);
    } else if (value === "=" && operand1 && operand2 && operator) {
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
          if (!isNaN(num))
            return (
              <button
                className={styles["calculator-button"] + " " + styles["number"]}
                onClick={onClickButton}
                key={num}
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
                onClick={onClickButton}
                key={num}
              >
                {num}
              </button>
            );
          else
            return (
              <button
                className={styles["calculator-button"] + " " + styles["clear"]}
                onClick={onClickButtonClear}
                key={num}
              >
                {num}
              </button>
            );
        })}
      </div>
    </div>
  );
}
