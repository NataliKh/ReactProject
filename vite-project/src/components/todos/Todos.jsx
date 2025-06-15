import React, { useState, useEffect, useMemo, useRef } from "react";
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
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const debounceTimeout = useRef(null);

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

  // Удаление задачи
  const handleDeleteTodo = (id) => {
    setIsDeleting(true);
    fetch(`http://localhost:3003/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => setRefreshTodos((r) => !r))
      .finally(() => {});
  };

  // Изменение completed
  const updateComplatedTodo = (id) => {
    setIsCreating(true);
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;
    const newCompleted = !todoToUpdate.completed;
    fetch(`http://localhost:3003/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: JSON.stringify({
        completed: newCompleted,
      }),
    })
      .then(() => setRefreshTodos((r) => !r))
      .finally(() => {
        setIsCreating(false);
      });
  };

  // Редактирование задачи
  const editTitleTodo = (id, title) => {
    fetch(`http://localhost:3003/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: JSON.stringify({
        title: title,
      }),
    }).then(() => setRefreshTodos((r) => !r));
  };

  const visibleTodos = useMemo(() => {
    let filtered = Array.isArray(todos) ? todos : [];

    if (debouncedSearchValue.trim() !== "") {
      filtered = filtered.filter((todo) =>
        todo.title
          .toLowerCase()
          .includes(debouncedSearchValue.trim().toLowerCase())
      );
    }

    if (isSorted) {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [todos, debouncedSearchValue, isSorted]);

  // Обработчики
  const handleSotred = () => setIsSorted((prev) => !prev);
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearchValue(value);
    }, 400);
  };

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
            <Todo
              key={id}
              id={id}
              title={title}
              done={completed}
              handleDeleteTodo={handleDeleteTodo}
              updateComplatedTodo={updateComplatedTodo}
              editTitleTodo={editTitleTodo}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      )}
      {visibleTodos.length === 0 && <p>Нет задач</p>}
    </>
  );
};

export default Todos;
