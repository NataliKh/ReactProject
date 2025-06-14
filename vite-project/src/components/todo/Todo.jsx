import React from "react";
import styles from "./Todo.module.css";
import { Link } from "react-router-dom";
import { TodoContext } from "../../context/TodoContext";

export const Todo = () => {
  const { visibleTodos } = React.useContext(TodoContext);

  return (
    <>
      {visibleTodos.map(({ id, title, done }) => (
        <Link
          key={id}
          to={`/todos/${id}`}
          className={`${styles["todo-item"]} ${
            done ? styles["todo-completed"] : ""
          }`}
        >
          <span className={styles["todo-text"]}>{title}</span>
        </Link>
      ))}
    </>
  );
};

export default Todo;
