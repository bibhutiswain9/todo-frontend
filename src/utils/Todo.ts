export enum TodoStatus {
  COMPLETE = "complete",
  INCOMPLETE = "incomplete",
}

export type Todo = {
  id: string;
  title: string;
  status: TodoStatus;
};
