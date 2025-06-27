import React, { useState, useEffect, useRef } from "react";
import { Todo } from "../todo/Todo.jsx";
import styles from "./Todos.module.css";
import {
  loadedTodos,
  addNewTodo,
  deleteTodo,
  updateComplatedTodo,
  editTodo,
  searchAndSortTodos,
} from "../../action/action.js";
import { useSelector, useDispatch } from "react-redux";

export const Todos = () => {
  const dispatch = useDispatch();

  const { todos, allTodos, isProcessing, isSorted, searchInput } = useSelector(
    (state) => state
  );

  const [searchInputValue, setSearchInputValue] = useState(searchInput);
  const [todoInput, setTodoInput] = useState("");

  const debounceTimeout = useRef(null);

  useEffect(() => {
    setSearchInputValue(searchInput);
  }, [searchInput]);

  useEffect(() => {
    dispatch(loadedTodos());
  }, [dispatch]);

  // Добавление новой задачи
  const handleAddNewTodo = () => {
    if (todoInput.trim() === "") return;
    dispatch(addNewTodo(todoInput.trim()));
    setTodoInput("");
  };

  // Удаление задачи
  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  // Обновление completed
  const handleUpdateComplatedTodo = (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;
    dispatch(updateComplatedTodo(id, !todoToUpdate.completed));
  };

  // Редактирование задачи
  const handleEditTitleTodo = (id, title) => {
    dispatch(editTodo(id, title));
  };

  // Обработчик поиска с дебаунсом
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchInputValue(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      dispatch(searchAndSortTodos(allTodos, value, isSorted));
    }, 400);
  };

  // Обработчик сортировки
  const handleSorted = () => {
    dispatch(searchAndSortTodos(allTodos, searchInputValue, !isSorted));
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

      <div className={styles["todo-panel"]}>
        <div className={styles["todo-panel__search"]}>
          <input
            placeholder="Поиск..."
            value={searchInputValue}
            onChange={handleSearchInput}
            aria-label="Поиск задач"
          />
        </div>
        <div className={styles["todo-panel__sort"]}>
          <button
            aria-label="Сортировать"
            onClick={handleSorted}
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

      {isProcessing && <p>Загрузка...</p>}

      {todos.length > 0 ? (
        <div className={styles["todo-list"]}>
          {todos.map(({ id, title, completed }) => (
            <Todo
              key={id}
              id={id}
              title={title}
              done={completed}
              handleDeleteTodo={handleDeleteTodo}
              updateComplatedTodo={handleUpdateComplatedTodo}
              editTitleTodo={handleEditTitleTodo}
              isDeleting={isProcessing}
            />
          ))}
        </div>
      ) : (
        <p>Нет задач</p>
      )}
    </>
  );
};

export default Todos;
