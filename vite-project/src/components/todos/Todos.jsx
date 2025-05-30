import React, { useState, useEffect } from "react";
import { ref, onValue, push, set, remove } from "firebase/database";
import { db } from "../../firebase.js";
import { Todo } from "../todo/Todo.jsx";
import styles from "./Todos.module.css";

export const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [refreshTodos, setRefreshTodos] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Получение списка задач
  useEffect(() => {
    const todosDbRef = ref(db, "todos");
    return onValue(todosDbRef, (snapshot) => {
      const loadedTodos = snapshot.val() || {};
      const todosObject = Object.entries(loadedTodos);
      const todosArray = todosObject.map(([key, value]) => ({
        id: key,
        ...value,
      }));
      setTodos(todosArray);
      setIsLoading(false);
    });
  }, []);

  // Добавление новой задачи
  const addNewTodo = () => {
    setIsCreating(true);
    const todosDbRef = ref(db, "todos");
    push(todosDbRef, {
      title: todoInput,
      completed: false,
    })
      .then() // Просто обновить список после добавления
      .finally(() => {
        setTodoInput("");
        setIsCreating(false);
      });
  };

  // Удаление задачи
  const handleDeleteTodo = (id) => {
    setIsDeleting(true);
    const todosDbRef = ref(db, `todos/${id}`);
    remove(todosDbRef)
      .then()
      .finally(() => {
        setIsLoading(false);
        setIsDeleting(false);
      });
  };

  // Изменение completed
  const updateComplatedTodo = (id) => {
    setIsCreating(true);
    const todosDbRef = ref(db, `todos/${id}`);
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;
    const newCompleted = !todoToUpdate.completed;

    set(todosDbRef, {
      ...todoToUpdate,
      completed: newCompleted,
    })
      .then()
      .finally(() => {
        setIsCreating(false);
      });
  };

  // Редактирование задачи
  const editTitleTodo = (id, title) => {
    const todosDbRef = ref(db, `todos/${id}`);
    set(todosDbRef, {
      title,
    })
    .then();
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
