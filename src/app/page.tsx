"use client";

import { createTod, deleteTodoParent, getAllTodo } from "@/api";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import TodoFilter from "@/components/TodoFilter";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";
import { TodosContext } from "@/context/todos-context";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Todo, TodoStatus } from "@/utils/Todo";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [firstRender, setFirstRender] = useState(true);
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFirstRender(false);
  }, []);
  useEffect(() => {
    getAllTodo().then((result: any) => {
      console.log("->", result?.Data);
      if (result?.Data?.length !== 0) {
        setTodos(result?.Data);
      }
    });
  }, []);

  const addTodo = async (title: string) => {
    if (!title) return;

    setIsLoading(true);
    const newTodo: Todo = {
      id: uuidv4(),
      title: title,
      status: TodoStatus.INCOMPLETE,
    };
    createTod(newTodo)
      .then(() => {
        setIsLoading(false);
        setTodos((prev) => [...prev, newTodo]);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("-->err", err);
      });
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            status:
              todo.status === TodoStatus.COMPLETE
                ? TodoStatus.INCOMPLETE
                : TodoStatus.COMPLETE,
          };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id: string) => {
    deleteTodoParent(id)
      .then(() => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      })
      .catch((err) => {
        console.log("--->err", err);
      });
  };

  const getActiveTodos = () => {
    if (params.get("complete") === "false") {
      return todos.filter((todo) => todo.status === TodoStatus.INCOMPLETE);
    } else if (params.get("complete") === "true") {
      return todos.filter((todo) => todo.status === TodoStatus.COMPLETE);
    }
    return todos;
  };

  const getTodosCounts = () => {
    let completeCount = 0;
    todos.forEach(
      (todo) => todo.status === TodoStatus.COMPLETE && completeCount++
    );

    return {
      totalCount: todos.length,
      completeCount,
      incompleteCount: todos.length - completeCount,
    };
  };

  if (firstRender) return <></>;

  return (
    <div className="HomePage w-screen h-screen flex justify-center items-center dark:bg-[#02040A] dark:text-stone-100">
      <div className="container max-w-xs sm:max-w-lg h-2/3 mx-4">
        <div className="header flex justify-between">
          <h1 className="text-3xl text-center sm:text-left">Todo List</h1>
          <ThemeSwitcher />
        </div>
        <hr className="border dark:border-stone-100" />
        <TodosContext.Provider
          value={{
            todos: getActiveTodos(),
            addTodo,
            toggleTodo,
            deleteTodo,
            getTodosCounts,
          }}
        >
          <TodoInput className="my-2" />
          <TodoFilter />
          <TodoList />
        </TodosContext.Provider>
      </div>
    </div>
  );
}
