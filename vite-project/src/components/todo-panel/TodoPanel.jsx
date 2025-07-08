import React from "react";
import styles from "./TodoPanel.module.css";

export const TodoPanel = ({
  searchInputValue,
  onSearchInput,
  onSorted,
  isSorted,
}) => {
  return (
    <div className={styles["todo-panel"]}>
      <div className={styles["todo-panel__search"]}>
        <input
          placeholder="Поиск..."
          value={searchInputValue}
          onChange={onSearchInput}
          aria-label="Поиск задач"
        />
      </div>
      <div className={styles["todo-panel__sort"]}>
        <button
          aria-label="Сортировать"
          onClick={onSorted}
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
  );
};

export default TodoPanel;
