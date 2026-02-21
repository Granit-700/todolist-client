import "./TodoAdd.css"
import { useState } from "react";
import { useCreateTodo } from "../../../todoStore";
import { Button } from "../../Button/Button";

const TodoAdd = () => {
  const [value, setValue] = useState("");

  const createTodo = useCreateTodo();

  return (
    <div className="TodoAdd">
      <input
        type="text"
        placeholder="New task title"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <Button
        onClick={async () => {
          await createTodo(value);
          setValue("");
        }}
        variant="primary"
      >
        Add
      </Button>
    </div>
  );
};

export default TodoAdd;
