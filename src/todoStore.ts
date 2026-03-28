import { create } from "zustand";
import type { TodoListType, UpdateTodoParams } from "./types";
import api from "./api";
import { useShallow } from "zustand/shallow";

interface State {
  todos: TodoListType | [];
  filter: string;
  getTodos: () => Promise<void>
  createTodo: (text: string) => Promise<void>;
  updateTodo: ({ _id, text, isDone }: UpdateTodoParams) => Promise<boolean>;
  deleteTodo: (_id: string) => Promise<void>;
  deleteAllTodo: () => Promise<void>;
  setFilter: (filter: string) => void;
};

const useTodoStore = create<State>((set) => {
  return {
    todos: [],
    filter: "",
    getTodos: async () => {
      try {
        const { data } = await api.get("/api/todos");
        set({ todos: data });

      } catch (e) {
        if (e instanceof Error) console.error(e.message);
      };
    },
    createTodo: async (text) => {
      const trimmedText = text.trim();
      if (!trimmedText) return;
      try {
        const { data } = await api.post("/api/todos", {
          text: trimmedText
        });
        set(state => ({ todos: [...state.todos, data] }))

      } catch (e) {
        if (e instanceof Error) console.error(e.message);
      };
    },
    updateTodo: async ({ _id, text, isDone }) => {
      const trimmedText = text?.trim();
      if (text !== undefined && !trimmedText) return false;
      try {
        const body: any = {}

        if (text !== undefined) body.text = trimmedText
        if (isDone !== undefined) body.isDone = isDone

        const { data } = await api.patch(`/api/todos/${_id}`, body);
        set(state => ({
          todos:
            state.todos.map(todo =>
              todo._id === _id ? data : todo
            )
        }));

      } catch (e) {
        if (e instanceof Error) console.error(e.message);
      };
      return true;
    },
    deleteTodo: async (_id) => {
      try {
        const { data } = await api.delete(`/api/todos/${_id}`);
        set(state => ({
          todos: state.todos.filter(todo => todo._id !== data._id)
        }));

      } catch (e) {
        if (e instanceof Error) console.error(e.message);
      };
    },
    deleteAllTodo: async () => {
      try {
        await api.delete("/api/todos");
        set({ todos: [] });

      } catch (e) {
        if (e instanceof Error) console.error(e.message);
      };
    },
    setFilter: (filter) => {
      set({ filter });
    },
  };
});

export const useTodos = () => useTodoStore(store => store.todos);
export const useFilteredTodos = () => useTodoStore(useShallow(store =>
  store.todos.filter(todo =>
    todo.text.toLowerCase().includes(store.filter.toLowerCase())
  )
));
export const useSetFilter = () => useTodoStore(store => store.setFilter);

export const useGetTodos = () => useTodoStore(store => store.getTodos);
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
