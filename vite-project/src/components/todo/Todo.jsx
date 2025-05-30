import React from "react";
import styles from "./Todo.module.css";

export const Todo = ({ title, done }) => {
  return (
    <div className={`${styles['todo-item']} ${done ? styles['todo-completed'] : ""}`}>
      <span className={styles['todo-text']}>{title}</span>
    </div>
  );
};

export default Todo;
