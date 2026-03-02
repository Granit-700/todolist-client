import "./TodoItem/TodoItem.css"
import { useDeleteTodo } from "../todoStore";
import type { TodoRemoveProps } from "../types";
import crossIcon from "../assets/icons/cross.svg";

const TodoRemove = ({ currentId }: TodoRemoveProps) => {
  const deleteTodo = useDeleteTodo();

  return (
    <button
      className="delete_Btn"
      onClick={async () => await deleteTodo(currentId)}
    >
      <img src={crossIcon} alt="cross" />
    </button>
  );
};

export default TodoRemove;
