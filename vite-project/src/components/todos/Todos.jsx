import React, { useState, useEffect, useRef } from "react";
import { Todo } from "../todo/Todo.jsx";
import { TodoForm } from "../todo-form/TodoForm.jsx";
import { TodoPanel } from "../todo-panel/TodoPanel.jsx";
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

  const debounceTimeout = useRef(null);

  useEffect(() => {
    setSearchInputValue(searchInput);
  }, [searchInput]);

  useEffect(() => {
    dispatch(loadedTodos());
  }, [dispatch]);

  // Добавление новой задачи
  const handleAddNewTodo = (todoText) => {
    dispatch(addNewTodo(todoText));
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
      <TodoForm onAddTodo={handleAddNewTodo} isProcessing={isProcessing} />

      <TodoPanel
        searchInputValue={searchInputValue}
        onSearchInput={handleSearchInput}
        onSorted={handleSorted}
        isSorted={isSorted}
      />

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
