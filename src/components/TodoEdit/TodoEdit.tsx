import { useState } from "react";
import type { TodoEditProps } from "../../types";
import { useUpdateTodo } from "../../todoStore";
import { Button } from "../Button/Button";
import "./TodoEdit.css";

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
      <div className="btns-wrap">
        <Button
          onClick={async () => {
            if (await updateTodo({ id: todo.id, text })) {
              setIsOpen(false);
            };
          }}
          size="sm"
        >
          Save
        </Button>
        <Button
          onClick={() => setIsOpen(false)}
          variant="outline"
          size="sm"
        >
          close
        </Button>
      </div>
    </>
  );
};

export default TodoEdit;
