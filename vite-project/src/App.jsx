import "./App.css";
import Todos from "./components/todos/Todos.jsx";
import TodoPage from "./pages/TodoPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/todos" replace />} />
      <Route path="/todos" element={<Todos />} />
      <Route path="/todos/:id" element={<TodoPage />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
