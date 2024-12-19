import { Todo } from "@/utils/Todo";
import { createContext, useContext } from "react";

export type TodoContextData = {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  getTodosCounts: () => {
    totalCount: number;
    completeCount: number;
    incompleteCount: number;
  };
};

export const TodosContext = createContext<TodoContextData | undefined>(
  undefined
);

export function useTodosContext() {
  const todoData = useContext(TodosContext);
  if (todoData === undefined) {
    throw new Error("todos is undefined. Use with TodosContext.Provider.");
  }

  return todoData;
}
