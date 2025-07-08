import React, { useState } from "react";
import styles from "./TodoForm.module.css";

export const TodoForm = ({ onAddTodo, isProcessing }) => {
  const [todoInput, setTodoInput] = useState("");

  const handleAddNewTodo = () => {
    if (todoInput.trim() === "") return;
    onAddTodo(todoInput.trim());
    setTodoInput("");
  };

  return (
    <div className={styles["input-with-button"]}>
      <input
        className={styles["add-todo-input"]}
        type="text"
        value={todoInput}
        placeholder="Новая задача"
        onChange={(e) => setTodoInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAddNewTodo();
        }}
      />
      <button
        className={styles["add-todo-button-inside"]}
        onClick={handleAddNewTodo}
        disabled={isProcessing}
        aria-label="Добавить задачу"
      >
        +
      </button>
    </div>
  );
};

export default TodoForm;
