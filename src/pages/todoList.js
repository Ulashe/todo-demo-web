import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../redux/reducers/authentication";
import {
  addTodo,
  getAllLocalTodoLists,
  removeTodo,
  updateTodo,
  updateTodoList,
} from "../redux/reducers/localTodoLists";
import axios from "axios";
import TodoList from "../components/todoList";

export default function TodoListPage() {
  const auth = useSelector(getAuth);
  if (auth.accessToken) {
    return <RemoteTodoList />;
  } else {
    return <LocalTodoList />;
  }
}

function RemoteTodoList() {
  const location = useLocation();
  const [todoList, setTodoList] = useState();
  useEffect(() => {
    if (location.state && location.state.todoList) {
      setTodoList(location.state.todoList);
    } else {
      axios.get("/api/todolists" + location.pathname).then((res) => setTodoList(res.data));
    }
  }, []);

  return <TodoList todoList={todoList} />;
}

function LocalTodoList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const localTodoLists = useSelector(getAllLocalTodoLists);
  const todoList = localTodoLists.find((i) => i._id == location.pathname.substring(1));

  const addTodoHandler = ({ _id, text }) => {
    dispatch(addTodo({ _id, text }));
  };

  const removeTodoHandler = ({ _id, todo }) => {
    dispatch(removeTodo({ _id, todo }));
  };

  const updateTodoHandler = ({ _id, todo }) => {
    dispatch(updateTodo({ _id, todo }));
  };

  const updateTodoListHandler = (todoList) => {
    dispatch(updateTodoList(todoList));
  };

  return (
    <TodoList
      todoList={todoList}
      addTodoHandler={addTodoHandler}
      removeTodoHandler={removeTodoHandler}
      updateTodoHandler={updateTodoHandler}
      updateTodoListHandler={updateTodoListHandler}
    />
  );
}
