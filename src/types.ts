export interface TodoItemType {
  _id: string;
  text: string;
  isDone: boolean;
};

export type TodoListType = TodoItemType[];

export interface UpdateTodoParams {
  _id: string;
  text?: string;
  isDone?: boolean;
};

// Props
export interface TodoItemProps {
  todo: TodoItemType;
};

export interface TodoRemoveProps {
  currentId: string;
};

export interface TodoEditProps {
  todo: TodoItemType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
