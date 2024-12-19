import { TodoItem } from "@/components/TodoItem";
import { useTodosContext } from "@/context/todos-context";
import { HTMLAttributes } from "react";

type TodoListProps = {} & HTMLAttributes<HTMLDivElement>;

export default function TodoList({ className }: TodoListProps) {
  const { todos } = useTodosContext();

  return (
    <div className={className}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
