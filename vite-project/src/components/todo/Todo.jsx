import React from "react";
import styles from "./Todo.module.css";
import { Link } from "react-router-dom";

export const Todo = ({ id, title, done }) => {
  return (
    <Link
      to={`/todos/${id}`}
      className={`${styles["todo-item"]} ${
        done ? styles["todo-completed"] : ""
      }`}
    >
      <span className={styles["todo-text"]}>{title}</span>
    </Link>
  );
};

export default Todo;
