import { useState } from "react";
import type { TodoEditProps } from "../types";
import { useUpdateTodo } from "../todoStore";

const TodoEdit = ({ todo, setIsOpen }: TodoEditProps) => {
  const [text, setText] = useState(todo.text);

  const updateTodo = useUpdateTodo();

  return (
    <>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        onClick={async () => {
          if (await updateTodo({ id: todo.id, text })) {
            setIsOpen(false);
          };
        }}
      >
        Save
      </button>
      <button onClick={() => setIsOpen(false)}>
        close
      </button>
    </>

  );
};

export default TodoEdit;
