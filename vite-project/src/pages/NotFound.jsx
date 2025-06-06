import React from "react";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: 64 }}>
      <h1>404 — Страница не найдена</h1>
      <p>Вы попали на несуществующий адрес.</p>
      <p>
        <code style={{ color: "#c00" }}>{window.location.pathname}</code>
      </p>
    </div>
  );
}
