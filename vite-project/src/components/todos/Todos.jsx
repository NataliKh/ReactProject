import React, { useState,useEffect } from "react";
import { Todo } from "../todo/Todo.jsx";
import styles from "./Todos.module.css";

export const Todos = () => {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(loadedTodos => setTodos(loadedTodos))
      .finally(() => setIsLoading(false));
  },[]);

  return (
    <div className={styles['todo-list']}>
      {isLoading && <p>Загрузка...</p>}
      {todos.map(({ id, title, completed }) => (
        <Todo key={id} id={id} title={title} done={completed} />
      ))}
    </div>
  );
};

export default Todos;