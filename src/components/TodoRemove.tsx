import "./TodoItem/TodoItem.css"
import { useDeleteTodo } from "../todoStore";
import type { TodoRemoveProps } from "../types";

const TodoRemove = ({ currentId }: TodoRemoveProps) => {
  const deleteTodo = useDeleteTodo();

  return (
    <button
      className="delete_Btn"
      onClick={async () => await deleteTodo(currentId)}
    >
      <img src="src/assets/icons/cross.svg" alt="cross" />
    </button>
  );
};

export default TodoRemove;
