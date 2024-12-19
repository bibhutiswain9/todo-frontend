import { useTodosContext } from "@/context/todos-context";
import { HTMLAttributes, useEffect, useRef, useState } from "react";

type TodoInputProps = {} & HTMLAttributes<HTMLDivElement>;

export default function TodoInput({ className }: TodoInputProps) {
  const { addTodo } = useTodosContext();
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null); // Initialize with null

  useEffect(() => {
    inputRef.current?.focus(); // Focus the input element on mount
  }, []);

  const handleAddTodo = () => {
    if (newTodoTitle.trim() === "") return; // Prevent adding empty todos
    addTodo(newTodoTitle);
    setNewTodoTitle("");
  };

  return (
    <div
      className={`space-y-2 sm:space-y-0 sm:space-x-2 ${className} flex flex-col sm:flex-row`}
    >
      <input
        className="rounded border px-2 py-1 text-lg sm:grow dark:bg-[#02040A] dark:outline-none dark:border-stone-400"
        type="text"
        value={newTodoTitle}
        onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
        onChange={(e) => setNewTodoTitle(e.target.value)}
        ref={inputRef} // Attach the ref to the input
      />
      <button
        className="rounded px-2 py-1 text-lg bg-green-600 text-white"
        onClick={handleAddTodo}
      >
        Add
      </button>
    </div>
  );
}
