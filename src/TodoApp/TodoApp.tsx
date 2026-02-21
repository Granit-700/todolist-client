import "./reset.css";
import "./style.css";
import TodoHeader from "../components/Header/Header";
import TodoInput from "../components/TodoInput/TodoInput";
import TodoList from "../components/TodoList/TodoList";
import TodoToolbar from "../components/TodoToolbar/TodoToolbar";
import { useGetTodos } from "../todoStore";
import { useEffect } from "react";

function TodoApp() {
  const getTodos = useGetTodos();

  useEffect(() => { getTodos() }, []);

  return (
    <div id="TodoApp">
      <TodoHeader />
      <TodoInput />
      <TodoToolbar />
      <TodoList />
    </div>
  );
};

export default TodoApp;
