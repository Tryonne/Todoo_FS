import React from "react";
import { Todo } from "../models/models";
import { SortableItem } from "./SortableItem";

interface Props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <div>
      {todos.map((todo) => (
        <SortableItem key={todo.id} id={todo.id}>
          <div>{todo.todo}</div>
        </SortableItem>
      ))}
    </div>
  );
};

export default TodoList;