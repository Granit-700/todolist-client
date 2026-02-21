import { create } from "zustand";
import type { TodoListType, UpdateTodoParams } from "./types";

interface State {
  todos: TodoListType | [];
  createTodo: (text: string) => void;
  updateTodo: ({ id, text, isDone }: UpdateTodoParams) => boolean;
  deleteTodo: (id: number) => void;
  deleteAllTodo: () => void;
};

const getInitTodos = (): TodoListType => {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : [];
};

const useTodoStore = create<State>((set, get) => {
  return {
    todos: getInitTodos(),
    createTodo: (text) => {
      const trimmedText = text.trim();
      if (trimmedText) {
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Date.now(),
              text: trimmedText,
              isDone: false,
            }
          ]
        }));
      };
    },
    updateTodo: ({ id, text, isDone }) => {
      const trimmedText = text?.trim();
      if (text !== undefined && !trimmedText) return false;

      set((state) => ({
        todos:
          state.todos.map(todo =>
            todo.id === id
              ? {
                ...todo,
                ...(text !== undefined && { text: trimmedText }),
                ...(isDone !== undefined && { isDone }),
              }
              : todo
          )
      }));
      return true;
    },
    deleteTodo: (id) => {
      set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id)
      }));
    },
    deleteAllTodo: () => {
      set({
        todos: []
      });
    },
  };
});

useTodoStore.subscribe((state, prevState) => {
  if (state.todos !== prevState.todos) {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  };
});

export const useTodos = () => useTodoStore(store => store.todos);
export const useCreateTodo = () => useTodoStore(store => store.createTodo);
export const useUpdateTodo = () => useTodoStore(store => store.updateTodo);
export const useDeleteTodo = () => useTodoStore(store => store.deleteTodo);
export const useDeleteAllTodo = () => useTodoStore(store =>
  store.deleteAllTodo
);

export const useTodosCount = () => useTodoStore(store => store.todos.length);
export const useDoneCount = () => useTodoStore(store =>
  store.todos.filter(todo => todo.isDone).length
);
