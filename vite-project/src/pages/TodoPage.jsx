import React, { useState, useEffect } from "react";
import styles from "./TodoPage.module.css";
import { useParams, useNavigate } from "react-router-dom";

function TodoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(undefined);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3003/todos/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        // здесь проверяем наличие id — если есть, задача существует
        if (!data || !data.id) throw new Error("not found");
        setTodo(data);
      })
      .catch(() => setTodo(null));
  }, [id]);

  useEffect(() => {
    if (todo === null) {
      navigate("/404", { replace: true });
    }
  }, [todo, navigate]);

  if (todo === undefined) return <div>Загрузка...</div>;

  const handleChange = (field, value) => {
    fetch(`http://localhost:3003/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    }).then(() => setTodo((t) => ({ ...t, [field]: value })));
  };

  const handleDelete = () => {
    setIsDeleting(true);
    fetch(`http://localhost:3003/todos/${id}`, { method: "DELETE" })
      .then(() => navigate("/todos"))
      .finally(() => setIsDeleting(false));
  };

  return (
    <>
      <button
        className={styles["todo-back"]}
        onClick={() => {
          navigate(-1);
        }}
      >
        <span className={styles["todo-back__arrow"]}>←</span>
      </button>
      <div
        className={`${styles["todo-item"]} ${
          todo.completed ? styles["todo-completed"] : ""
        }`}
      >
        <input
          type="checkbox"
          className={styles["todo-checkbox"]}
          checked={todo.completed}
          onChange={() => handleChange("completed", !todo.completed)}
        />
        <input
          className={styles["todo-text"]}
          value={todo.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <button
          className={styles["todo-delete"]}
          onClick={handleDelete}
          disabled={isDeleting}
        >
          X
        </button>
      </div>
    </>
  );
}

export default TodoPage;
