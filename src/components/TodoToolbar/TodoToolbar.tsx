import "./TodoToolbar.css";
import { useDeleteAllTodo, useDoneCount, useTodosCount } from "../../todoStore";
import { Button } from "../Button/Button";

const TodoToolbar = () => {

  const todosCount = useTodosCount();
  const doneCount = useDoneCount();
  const deleteAllTodos = useDeleteAllTodo();

  return (
    <div className="TodoToolBar">
      <div className="counter">
        <span>
          Todo{todosCount > 1 ? "s" : ""}: {todosCount}
        </span>
        <span>
          Done: {doneCount}
        </span>
      </div>
      {todosCount >= 1 && (
        <Button
          onClick={deleteAllTodos}
          variant="text"
        >
          Delete All
        </Button>
      )}
    </div>
  );
};

export default TodoToolbar;
