import "./TodoItem.css";
import { useState } from "react";
import type { TodoItemProps } from "../../types";
import TodoEdit from "../TodoEdit";
import TodoRemove from "../TodoRemove";
import { useUpdateTodo } from "../../todoStore";

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateTodo = useUpdateTodo();

  return (
    <li className="TodoItem">
      {isOpen === true
        ?
        <TodoEdit
          todo={todo}
          setIsOpen={setIsOpen}
        />
        :
        <>
          <input
            type="checkbox"
            checked={todo.isDone}
            onChange={async e => {
              await updateTodo({ id: todo.id, isDone: e.target.checked });
            }}
          />
          <p className={`text ${todo.isDone}`} >
            {todo.text}
          </p>
          <button onClick={() => setIsOpen(true)}>
            <img src="src/assets/icons/edit.svg" alt="edit" />
          </button>
          <TodoRemove currentId={todo.id} />
        </>
      }
    </li>
  );
};

export default TodoItem;
