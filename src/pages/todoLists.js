import React from "react";
import { useSelector } from "react-redux";
import { getAllLocalTodoLists } from "../redux/reducers/localTodoLists";
import Heading from "./heading";
import { TodoList } from "./todoList";
import { TextButton } from "./textButton";

export default function TodoLists() {
  const localTodoLists = useSelector(getAllLocalTodoLists);

  return (
    <div>
      <Heading>Todo Lists</Heading>
      <div>
        {localTodoLists.map((todo) => (
          <TodoList key={todo._id}>{todo.title}</TodoList>
        ))}
      </div>
      <TextButton variant="outlined">Yeni bir Todo List oluştur</TextButton>
    </div>
  );
}
