import React, { useState, useEffect, useMemo, useRef } from "react";
import { Todo } from "../todo/Todo.jsx";
import styles from "./Todos.module.css";
import {
  loadedTodos,
  addNewTodo,
  deleteTodo,
  updateComplatedTodo,
  editTodo,
} from "../../action/action.js";
import { useSelector, useDispatch } from "react-redux";

export const Todos = () => {
  const [todoInput, setTodoInput] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const debounceTimeout = useRef(null);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const isDeleting = useSelector((state) => state.todos.isDeleting);
  // Получение списка задач
  useEffect(() => {
    dispatch(loadedTodos());
  }, [dispatch]);

  // Добавление новой задачи
  const handleAddNewTodo = () => {
    dispatch(addNewTodo(todoInput));
    setTodoInput("");
  };

  // // Удаление задачи
  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  // // Изменение completed
  const handleUpdateComplatedTodo = (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;
    const newCompleted = !todoToUpdate.completed;
    dispatch(updateComplatedTodo(id, newCompleted));
  };

  // // Редактирование задачи
  const handleEditTitleTodo = (id, title) => {
    dispatch(editTodo(id, title));
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

  // // Обработчики
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
          onClick={handleAddNewTodo}
          disabled={isLoading}
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
              updateComplatedTodo={handleUpdateComplatedTodo}
              editTitleTodo={handleEditTitleTodo}
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
