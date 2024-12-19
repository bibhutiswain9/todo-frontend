import { useTodosContext } from "@/context/todos-context";
import trashIcon from "@/public/trash.svg";
import { Todo, TodoStatus } from "@/utils/Todo";
import Image from "next/image";

type TodoItemProps = {
  todo: Todo;
};

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useTodosContext();

  return (
    <div className="flex space-x-2 border px-2 py-1 my-2 rounded dark:border-stone-700">
      <input
        className="w-5 h-5 rounded-full self-start mt-1"
        type="checkbox"
        checked={todo.status === TodoStatus.COMPLETE}
        onChange={() => toggleTodo(todo.id)}
      />
      <h3
        className={`text-xl ${
          todo.status === TodoStatus.COMPLETE && "line-through"
        }`}
      >
        {todo.title}
      </h3>
      <button
        className="rounded bg-red-500 p-1 self-start m-1"
        onClick={() => deleteTodo(todo.id)}
      >
        <Image src={trashIcon} alt="Delete" width={12} height={12} />
      </button>
    </div>
  );
}
