import React, { useState, useEffect } from "react";
import { Todo } from "../todo/Todo.jsx";
import styles from "./Todos.module.css";

export const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [refreshTodos, setRefreshTodos] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Получение списка задач
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3003/todos")
      .then((response) => response.json())
      .then((loadedTodos) => {
        setTodos(loadedTodos);
        setIsDeleting(false);
      })
      .finally(() => setIsLoading(false));
  }, [refreshTodos]);

  // Добавление новой задачи
  const addNewTodo = () => {
    setIsCreating(true);
    fetch("http://localhost:3003/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: JSON.stringify({
        title: todoInput,
        completed: false,
      }),
    })
      .then((response) => response.json())
      .then(() => setRefreshTodos((r) => !r)) // Просто обновить список после добавления
      .finally(() => {
        setTodoInput("");
        setIsCreating(false);
      });
  };

  // Поиск и сортировка с debounce
  const [visibleTodos, setVisibleTodos] = useState([]);
  useEffect(() => {
    const handler = setTimeout(() => {
      let filtered = todos;
      if (searchValue.trim() !== "") {
        filtered = todos.filter((todo) =>
          todo.title.toLowerCase().includes(searchValue.trim().toLowerCase())
        );
      }
      if (isSorted) {
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
      }
      setVisibleTodos(filtered);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchValue, todos, isSorted]);

  // Обработчики
  const handleSotred = () => setIsSorted((prev) => !prev);
  const handleSearchInput = (e) => setSearchValue(e.target.value);

  return (
    <>
      <div className={styles["input-with-button"]}>
        <input
          className={styles["add-todo-input"]}
          type="text"
          value={todoInput}
          placeholder="Новая задача"
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button
          className={styles["add-todo-button-inside"]}
          onClick={addNewTodo}
          disabled={isCreating}
          aria-label="Добавить задачу"
        >
          +
        </button>
      </div>
      <div className={styles["todo-panel"]}>
        <div className={styles["todo-panel__search"]}>
          <input
            placeholder="Поиск..."
            value={searchValue}
            onChange={handleSearchInput}
          />
        </div>
        <div className={styles["todo-panel__sort"]}>
          <button
            aria-label="Сортировать"
            onClick={handleSotred}
            className={`${isSorted ? styles["sort-active"] : ""}`}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path
                d="M6 7L10 3L14 7"
                stroke="#555"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 13L10 17L6 13"
                stroke="#555"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      {visibleTodos.length > 0 && (
        <div className={styles["todo-list"]}>
          {isLoading && <p>Загрузка...</p>}
          {visibleTodos.map(({ id, title, completed }) => (
            <Todo key={id} id={id} title={title} done={completed} />
          ))}
        </div>
      )}
      {visibleTodos.length === 0 && <p>Нет задач</p>}
    </>
  );
};

export default Todos;
