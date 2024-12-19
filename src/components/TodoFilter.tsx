import { useTodosContext } from "@/context/todos-context";
import Link from "next/link";

type TodoFilterProps = {
  handleDeleteCompleted?: () => void;
};

export default function TodoFilter({ handleDeleteCompleted }: TodoFilterProps) {
  const { getTodosCounts } = useTodosContext();
  const todosCounts = getTodosCounts();
  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:justify-between">
      <div className="flex justify-between sm:space-x-2">
        <Link href={"/"}>
          <button className="rounded bg-indigo-500 text-white px-2">
            All ({todosCounts.totalCount})
          </button>
        </Link>
        <Link href={"/?complete=false"}>
          <button className="rounded bg-indigo-500 text-white px-2">
            Pending ({todosCounts.incompleteCount})
          </button>
        </Link>
        <Link href={"/?complete=true"}>
          <button className="rounded bg-indigo-500 text-white px-2">
            Completed ({todosCounts.completeCount})
          </button>
        </Link>
      </div>
    </div>
  );
}
