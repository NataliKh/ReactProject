import React from "react";
import styles from "./Todo.module.css";

export const Todo = ({
  id,
  title,
  done,
  handleDeleteTodo,
  updateComplatedTodo,
  editTitleTodo,
  isDeleting,
}) => {
  return (
    <div
      className={`${styles["todo-item"]} ${
        done ? styles["todo-completed"] : ""
      }`}
    >
      <input
        type="checkbox"
        className={styles["todo-checkbox"]}
        onChange={() => updateComplatedTodo(id)}
        checked={done}
      />
      <input
        className={styles["todo-text"]}
        value={title}
        onChange={(e) => editTitleTodo(id, e.target.value)}
      />
      <button
        className={styles["todo-delete"]}
        onClick={() => handleDeleteTodo(id)}
        disabled={isDeleting}
      >
        X
      </button>
    </div>
  );
};

export default Todo;
